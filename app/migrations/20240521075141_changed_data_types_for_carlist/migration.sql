/*
  Warnings:

  - You are about to drop the column `mpg` on the `CarList` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CarList" DROP COLUMN "mpg",
ALTER COLUMN "price" SET DATA TYPE TEXT,
ALTER COLUMN "milage" SET DATA TYPE TEXT,
ALTER COLUMN "year" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Contact" ALTER COLUMN "email" SET DATA TYPE TEXT,
ALTER COLUMN "message" SET DATA TYPE TEXT;
