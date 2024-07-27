import { Prisma, PrismaClient } from '@prisma/client';
import express from 'express';
import cors from 'cors';
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
  const { title, content } = req.body;

  try {
    const note = await prisma.note.create({
      data: {
        title,
        content,
        createTimestamp: dayjs().unix(),
        updateTimestamp: dayjs().unix()
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
  const { title, content, isArchived, isTrashed } = req.body;

  try {
    const note = await prisma.note.update({
      where: {
        id
      },
      data: {
        title,
        content,
        isArchived,
        isTrashed,
        updateTimestamp: dayjs().unix()
      }
    });

    res.send(note);
  } catch (error) {
    console.error('Error updating note:', error);
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

app.listen(PORT, () => {
  console.log(`App is listening at http://localhost:${PORT}`);
});
