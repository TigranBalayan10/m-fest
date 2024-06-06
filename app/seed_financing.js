const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');

const prismaClient = new PrismaClient();

async function main() {
  // Create mock financing personal data
  const financingPersonalData = Array.from({ length: 10 }, () => ({
    firstName: faker.person.firstName(),
    middleName: faker.person.middleName(),
    lastName: faker.person.lastName(),
    ssnItin: faker.string.numeric(9),
    dob: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }).toLocaleDateString('en-US'),
  }));

  await prismaClient.financingPersonal.createMany({ data: financingPersonalData });

  // Create mock financing contact info data
  const financingContactInfoData = Array.from({ length: 10 }, () => ({
    phone: faker.phone.number(),
    email: faker.internet.email(),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zip: faker.location.zipCode(),
  }));

  await prismaClient.financingContactInfo.createMany({ data: financingContactInfoData });

  // Create mock financing data
  const createdFinancingPersonal = await prismaClient.financingPersonal.findMany();
  const createdFinancingContactInfo = await prismaClient.financingContactInfo.findMany();

  const financingData = createdFinancingPersonal.map((personal, index) => ({
    personalId: personal.id,
    contactId: createdFinancingContactInfo[index].id,
  }));

  await prismaClient.financing.createMany({ data: financingData });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prismaClient.$disconnect();
  });