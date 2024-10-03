import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';
import { hashPassword } from '../src/utils';

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.user.deleteMany({});
    await prisma.note.deleteMany({});

    const test1User = await prisma.user.create({
      data: {
        email: 'test1@gmail.com',
        password: await hashPassword('test1')
      }
    });

    await prisma.note.createMany({
      data: [
        {
          authorId: test1User.id,
          title: 'Note One',
          content: 'Content of note one',
          createTimestamp: dayjs('2000-12-25').unix(),
          updateTimestamp: dayjs('2000-12-25').unix()
        },
        {
          authorId: test1User.id,
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
