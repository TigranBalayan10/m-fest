/*
  Warnings:

  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_carListId_fkey";

-- AlterTable
ALTER TABLE "CarList" ADD COLUMN     "Images" TEXT[];

-- DropTable
DROP TABLE "Image";
