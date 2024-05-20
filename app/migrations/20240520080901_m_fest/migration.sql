/*
  Warnings:

  - You are about to drop the column `title` on the `CarList` table. All the data in the column will be lost.
  - Added the required column `model` to the `CarList` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CarList" DROP COLUMN "title",
ADD COLUMN     "model" TEXT NOT NULL;
