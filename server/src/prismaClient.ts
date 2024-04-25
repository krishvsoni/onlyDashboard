import { PrismaClient } from '@prisma/client';
import faker from 'faker';

const prisma = new PrismaClient();

async function addData() {
  try {
    const users = [];
    const stores = [];

    
    for (let i = 0; i < 5; i++) {
      const user = await prisma.user.create({
        data: {
          name: faker.name.findName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
        },
      });
      users.push(user);
    }

    console.log('Users added:', users);

   
    for (let i = 0; i < 5; i++) {
      const store = await prisma.store.create({
        data: {
          name: faker.company.companyName(),
          address: faker.address.streetAddress(),
          type: faker.commerce.department(),
          ownerId: users[Math.floor(Math.random() * users.length)].id,
        },
      });
      stores.push(store);
    }

    console.log('Stores added:', stores);
  } catch (error) {
    console.error('Error adding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

addData();

export default prisma;