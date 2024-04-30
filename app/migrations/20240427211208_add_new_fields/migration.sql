/*
  Warnings:

  - The primary key for the `Image` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `created_at` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Image` table. All the data in the column will be lost.
  - The `id` column on the `Image` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Image" DROP CONSTRAINT "Image_pkey",
DROP COLUMN "created_at",
DROP COLUMN "updated_at",
ADD COLUMN     "publicId" TEXT,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "url" DROP NOT NULL,
ADD CONSTRAINT "Image_pkey" PRIMARY KEY ("id");
