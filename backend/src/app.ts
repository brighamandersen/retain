import { Note, PrismaClient, User } from '@prisma/client';
import express, { Request, Response } from 'express';
import session from 'express-session';
import cors from 'cors';
import dotenv from 'dotenv';
import cron from 'node-cron';
import dayjs from 'dayjs';
import { ONE_WEEK_IN_MS } from './constants';
import './types'; // Must import this so it uses custom express-session SessionData
import { compareRawToHashedPassword, hashPassword } from './utils';
import requireAuth from './requireAuth';

dotenv.config();

if (!process.env.SESSION_KEY) {
  console.error(
    'SESSION_KEY environment variable is not set. Please provide a value for SESSION_KEY in .env file.'
  );
  process.exit(1);
}

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
// app.use(cors({ origin: '*', credentials: true }));
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(
  session({
    cookie: {
      maxAge: ONE_WEEK_IN_MS,
      secure: false, // FIXME, JUST FOR LOCAL TESTING
      httpOnly: true,
      sameSite: 'lax' // FIXME, just for LOCAL TESTING
    },
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_KEY
  })
);
const prisma = new PrismaClient();

app.post(
  '/register',
  async (
    req: Request<
      {},
      {},
      {
        email: string;
        password: string;
      }
    >,
    res: Response<{ message: string; data?: User }>
  ) => {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).send({ message: 'Invalid request body' });
      return;
    }

    try {
      const userWithSameEmail = await prisma.user.findUnique({
        where: {
          email: email
        }
      });

      if (userWithSameEmail) {
        res.status(409).send({ message: `Email ${email} already registered` });
        return;
      }

      const createdUser = await prisma.user.create({
        data: {
          email,
          password: await hashPassword(password)
        }
      });
      console.log('req.session before:', req.session);

      req.session.userId = createdUser.id;
      console.log('req.session after:', req.session);
      res
        .status(201)
        .send({ message: 'Successfully registered', data: createdUser });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  }
);

app.post(
  '/login',
  async (
    req: Request<
      {},
      {},
      {
        email: string;
        password: string;
      }
    >,
    res: Response<{ message: string; data?: User }>
  ) => {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).send({ message: 'Email and password are required' });
      return;
    }

    try {
      const user = await prisma.user.findUnique({
        where: {
          email: email
        }
      });

      if (!user) {
        res.status(404).send({
          message: `User not found with email: ${email}`
        });
        return;
      }

      const passwordsMatch = await compareRawToHashedPassword(
        password,
        user.password
      );
      if (!passwordsMatch) {
        res.status(401).send({ message: 'Invalid password' });
        return;
      }

      req.session.userId = user.id;
      res.status(200).send({ message: 'Successfully logged in', data: user });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  }
);

app.post('/logout', (req: Request, res: Response<{ message: string }>) => {
  if (!req.session?.userId) {
    res.status(401).send({ message: 'No one was logged in' });
    return;
  }

  const userId = req.session.userId;
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      res.status(500).send({ message: 'Internal Server Error' });
      return;
    }
    res.clearCookie('connect.sid'); // FIXME: Check if i need this
    res.status(200).send({
      message: `User ${userId} logged out successfully`
    });
  });
});

app.get('/', (_req: Request, res: Response) => {
  res.send('Welcome to retain api');
});

app.post(
  '/notes',
  requireAuth,
  async (
    req: Request<
      {},
      {},
      {
        color?: string;
        content?: string;
        isArchived?: boolean;
        isPinned?: boolean;
        isTrashed?: boolean;
        title?: string;
      }
    >,
    res: Response<{ message: string; data?: Note }>
  ) => {
    const { color, content, isArchived, isPinned, isTrashed, title } = req.body;

    if (!title && !content) {
      return res.status(400).send({ message: 'Title or content are required' });
    }

    try {
      const note = await prisma.note.create({
        data: {
          color,
          content,
          createTimestamp: dayjs().unix(),
          isArchived: isArchived || false,
          isPinned: isPinned || false,
          isTrashed: isTrashed || false,
          title,
          updateTimestamp: dayjs().unix()
        }
      });

      res.send({ message: 'Note created successfully', data: note });
    } catch (error) {
      console.error('Error creating note:', error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  }
);

app.get(
  '/notes',
  requireAuth,
  async (_req: Request, res: Response<{ message: string; data?: Note[] }>) => {
    try {
      const allNotes = await prisma.note.findMany({
        orderBy: {
          createTimestamp: 'desc'
        }
      });
      res.send({ message: 'Notes retrieved successfully', data: allNotes });
    } catch (error) {
      console.error('Error getting all notes:', error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  }
);

app.get(
  '/notes/:id',
  requireAuth,
  async (
    req: Request<{ id: string }>,
    res: Response<{ message: string; data?: Note }>
  ) => {
    const { id } = req.params;

    try {
      const note = await prisma.note.findUnique({
        where: {
          id
        }
      });

      if (!note) {
        return res.status(404).send({ message: 'Note not found' });
      }

      res.send({ message: 'Note retrieved successfully', data: note });
    } catch (error) {
      console.error('Error getting note by id:', error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  }
);

app.put(
  '/notes/:id',
  requireAuth,
  async (
    req: Request<
      { id: string },
      {},
      {
        color?: string;
        content?: string;
        isArchived?: boolean;
        isPinned?: boolean;
        isTrashed?: boolean;
        title?: string;
      }
    >,
    res: Response<{ message: string; data?: Note }>
  ) => {
    const { id } = req.params;
    const { color, content, isArchived, isPinned, isTrashed, title } = req.body;

    try {
      const existingNote = await prisma.note.findUnique({
        where: { id }
      });

      if (!existingNote) {
        return res.status(404).send({ message: 'Note not found' });
      }

      const updatedNote = await prisma.note.update({
        where: {
          id
        },
        data: {
          color,
          content,
          isArchived,
          isPinned,
          isTrashed,
          title,
          updateTimestamp: dayjs().unix()
        }
      });

      res.send({ message: 'Note updated successfully', data: updatedNote });
    } catch (error) {
      console.error('Error updating note:', error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  }
);

app.delete(
  '/notes/trashed',
  requireAuth,
  async (_req: Request, res: Response<{ message: string }>) => {
    try {
      const { count } = await prisma.note.deleteMany({
        where: {
          isTrashed: true
        }
      });
      res.send({ message: `Deleted all ${count} trashed notes` });
    } catch (error) {
      console.error('Error deleting all trashed notes', error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  }
);

app.delete(
  '/notes/:id',
  requireAuth,
  async (req: Request<{ id: string }>, res: Response<{ message: string }>) => {
    const { id } = req.params;
    try {
      await prisma.note.delete({
        where: {
          id
        }
      });

      res.send({ message: 'Note deleted successfully' });
    } catch (error) {
      console.error('Error deleting note:', error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  }
);

// Runs every night at midnight
cron.schedule('0 0 * * *', async () => {
  try {
    const { count } = await prisma.note.deleteMany({
      where: {
        isTrashed: true,
        updateTimestamp: {
          lte: dayjs().subtract(7, 'days').unix()
        }
      }
    });
    console.log(`Deleted ${count} notes trashed over 7 days ago`);
  } catch (error) {
    console.error('Error deleting notes trashed over 7 days ago', error);
  }
});

app.listen(PORT, () => {
  console.log(`App is listening at http://localhost:${PORT}`);
});
