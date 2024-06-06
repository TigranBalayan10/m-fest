const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');

const prismaClient = new PrismaClient();

async function main() {
  // Create mock customers
  const customers = Array.from({ length: 10 }, () => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
  }));

  await prismaClient.customer.createMany({ data: customers });

  // Create mock messages
  const createdCustomers = await prismaClient.customer.findMany();

  for (const customer of createdCustomers) {
    const messageCreatedAt = faker.date.between({
      from: customer.createdAt,
      to: new Date(),
    });

    await prismaClient.message.create({
      data: {
        content: faker.lorem.sentence(),
        customerId: customer.id,
        createdAt: messageCreatedAt,
      },
    });
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prismaClient.$disconnect();
  });