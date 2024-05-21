/*
  Warnings:

  - You are about to alter the column `email` on the `Contact` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `message` on the `Contact` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(1000)`.
  - Added the required column `mpg` to the `CarList` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `price` on the `CarList` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `milage` on the `CarList` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `year` on the `CarList` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `phone` on the `Contact` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "CarList" ADD COLUMN     "mpg" TEXT NOT NULL,
DROP COLUMN "price",
ADD COLUMN     "price" INTEGER NOT NULL,
DROP COLUMN "milage",
ADD COLUMN     "milage" INTEGER NOT NULL,
DROP COLUMN "year",
ADD COLUMN     "year" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Contact" ALTER COLUMN "email" SET DATA TYPE VARCHAR(255),
DROP COLUMN "phone",
ADD COLUMN     "phone" INTEGER NOT NULL,
ALTER COLUMN "message" SET DATA TYPE VARCHAR(1000);
