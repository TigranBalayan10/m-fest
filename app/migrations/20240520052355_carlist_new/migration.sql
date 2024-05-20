/*
  Warnings:

  - Added the required column `drivetrain` to the `CarList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `engine` to the `CarList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transmission` to the `CarList` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CarList" ADD COLUMN     "drivetrain" TEXT NOT NULL,
ADD COLUMN     "engine" TEXT NOT NULL,
ADD COLUMN     "transmission" TEXT NOT NULL;
