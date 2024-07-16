import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.note.deleteMany({});

    await prisma.note.createMany({
      data: [
        {
          title: 'Note One',
          content: 'Content of note one',
          createTimestamp: dayjs('2000-12-25').unix(),
          updateTimestamp: dayjs('2000-12-25').unix()
        },
        {
          title: 'Note Two',
          content: 'Content of note two',
          createTimestamp: dayjs('2000-12-25').unix(),
          updateTimestamp: dayjs('2000-12-25').unix()
        }
      ]
    });

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
