/*
  Warnings:

  - Made the column `description` on table `CarList` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "CarList" ALTER COLUMN "description" SET NOT NULL;
