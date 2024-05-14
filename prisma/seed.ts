import prisma from "@/lib/prisma";
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  const adminLogin = process.env.ADMIN_LOGIN;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (adminLogin && adminPassword) {
    const adminUser = await prisma.adminUser.upsert({
      where: { login: adminLogin },
      update: {},
      create: {
        login: adminLogin,
        password: adminPassword,
      },
    });

    console.log({ adminUser });
  } else {
    console.error(
      "ADMIN_LOGIN and ADMIN_PASSWORD environment variables must be set"
    );
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
