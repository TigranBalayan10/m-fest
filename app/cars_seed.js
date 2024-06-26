const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");
const cloudinary = require("cloudinary").v2;

const prismaClient = new PrismaClient();

// Configure Cloudinary with your account credentials
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function main() {
  // Fetch the list of images from your Cloudinary account
  const result = await cloudinary.api.resources({
    type: "upload",
    prefix: "Mock Data/", // Specify the folder where your car images are stored
    max_results: 100, // Adjust the maximum number of results as needed
  });

  const availablePublicIds = result.resources.map(
    (resource) => resource.public_id
  );

  // Create mock car listings
  const carListings = Array.from({ length: 15 }, () => {
    const imageCount = faker.number.int({ min: 5, max: 6 });
    const imageUrls = getUniquePublicIds(availablePublicIds, imageCount);

    return {
      make: faker.vehicle.manufacturer(),
      model: faker.vehicle.model(),
      description: faker.lorem.paragraph(),
      price: faker.number.int({ min: 10000, max: 100000 }),
      milage: faker.number.int({ min: 0, max: 200000 }),
      vin: faker.vehicle.vin({ min: 17, max: 17 }),
      drivetrain: faker.helpers.arrayElement(["front wheel drive", "rear wheel drive", "all wheel drive", "four wheel drive"]),
      transmission: faker.helpers.arrayElement(["Automatic", "Manual"]),
      engine: generateEngineInfo(),
      mpg: `${faker.number.int({ min: 15, max: 40 })}/${faker.number.int({
        min: 20,
        max: 50,
      })}`,
      year: faker.number.int({ min: 2000, max: 2023 }),
      exteriorInterior: faker.vehicle.color() + "/" + faker.vehicle.color(),
      imageUrls,
    };
  });

  await prismaClient.carList.createMany({ data: carListings });
}

function generateEngineInfo() {
  const engineTypes = ["V6", "V8", "I4", "I6", "Electric"];
  const engineType = faker.helpers.arrayElement(engineTypes);
  const engineDisplacement = faker.number.float({
    min: 1.5,
    max: 6.0,
    multipleOf: 0.1,
  });
  return `${engineType} ${engineDisplacement.toFixed(1)}L`;
}

function getUniquePublicIds(availablePublicIds, count) {
  const selectedPublicIds = [];

  for (let i = 0; i < count; i++) {
    if (availablePublicIds.length === 0) {
      break;
    }

    const randomIndex = faker.number.int({
      min: 0,
      max: availablePublicIds.length - 1,
    });
    const selectedPublicId = availablePublicIds[randomIndex];
    selectedPublicIds.push(selectedPublicId);
    availablePublicIds.splice(randomIndex, 1);
  }

  return selectedPublicIds;
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prismaClient.$disconnect();
  });
