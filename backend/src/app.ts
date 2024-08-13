import { PrismaClient } from '@prisma/client';
import express from 'express';
import cors from 'cors';
import cron from 'node-cron';
import dayjs from 'dayjs';

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(cors({ origin: '*' }));
const prisma = new PrismaClient();

app.get('/', (_req, res) => {
  res.send('Welcome to retain api');
});

app.post('/notes', async (req, res) => {
  const { title, content, isArchived, isPinned, isTrashed } = req.body;

  if (!title && !content) {
    return res.status(400).send('Title or content are required');
  }

  try {
    const note = await prisma.note.create({
      data: {
        title,
        content,
        createTimestamp: dayjs().unix(),
        updateTimestamp: dayjs().unix(),
        isArchived: isArchived || false,
        isPinned: isPinned || false,
        isTrashed: isTrashed || false
      }
    });

    res.send(note);
  } catch (error) {
    console.error('Error creating note:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/notes', async (_req, res) => {
  try {
    const allNotes = await prisma.note.findMany({
      orderBy: {
        createTimestamp: 'desc'
      }
    });
    res.send(allNotes);
  } catch (error) {
    console.error('Error getting all notes:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/notes/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const note = await prisma.note.findUnique({
      where: {
        id
      }
    });

    if (!note) {
      return res.status(404).send('Note not found');
    }

    res.send(note);
  } catch (error) {
    console.error('Error getting note by id:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.put('/notes/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content, isArchived, isPinned, isTrashed } = req.body;

  try {
    const existingNote = await prisma.note.findUnique({
      where: { id }
    });

    if (!existingNote) {
      return res.status(404).send('Note not found');
    }

    const updatedNote = await prisma.note.update({
      where: {
        id
      },
      data: {
        title,
        content,
        isArchived,
        isPinned,
        isTrashed,
        updateTimestamp: dayjs().unix()
      }
    });

    res.send(updatedNote);
  } catch (error) {
    console.error('Error updating note:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.delete('/notes/trashed', async (_req, res) => {
  try {
    const { count } = await prisma.note.deleteMany({
      where: {
        isTrashed: true
      }
    });
    res.send(`Deleted all ${count} trashed notes`);
  } catch (error) {
    console.error('Error deleting all trashed notes', error);
    res.status(500).send('Internal Server Error');
  }
});

app.delete('/notes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.note.delete({
      where: {
        id
      }
    });

    res.send('Note deleted successfully');
  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).send('Internal Server Error');
  }
});

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
