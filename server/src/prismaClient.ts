
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function addData() {
  try {
    const user1 = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      },
    });

    const user2 = await prisma.user.create({
      data: {
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: 'password456',
      },
    });

    console.log('Users added:', user1, user2);

    const store1 = await prisma.store.create({
      data: {
        name: 'Store A',
        address: '123 Main St',
        type: 'Grocery',
        ownerId: user1.id,
      },
    });

    const store2 = await prisma.store.create({
      data: {
        name: 'Store B',
        address: '456 Elm St',
        type: 'Clothing',
        ownerId: user2.id,
      },
    });

    console.log('Stores added:', store1, store2);
  } catch (error) {
    console.error('Error adding data:', error);
  } finally {
    await prisma.$disconnect(); 
  }
}

addData();

export default prisma;
