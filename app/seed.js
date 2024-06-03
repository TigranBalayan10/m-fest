const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');

const prismaClient = new PrismaClient();

async function main() {
  // Create mock customers
  const customers = Array.from({ length: 10 }, () => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    createdAt: faker.date.between({ from: '2022-01-01', to: '2023-06-02' }),
  }));

  await prismaClient.customer.createMany({ data: customers });

  // Create mock messages
  const createdCustomers = await prismaClient.customer.findMany();

  const messages = createdCustomers.map((customer) => ({
    content: faker.lorem.sentence(),
    customerId: customer.id,
    createdAt: faker.date.between({ from: customer.createdAt, to: '2023-06-02' }),
  }));

  await prismaClient.message.createMany({ data: messages });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prismaClient.$disconnect();
  });