/*
  Warnings:

  - You are about to drop the column `Images` on the `CarList` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CarList" DROP COLUMN "Images",
ADD COLUMN     "imageUrls" TEXT[];
