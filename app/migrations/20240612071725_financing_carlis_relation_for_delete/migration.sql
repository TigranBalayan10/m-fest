/*
  Warnings:

  - A unique constraint covering the columns `[vin]` on the table `CarList` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `vin` to the `Financing` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Financing" ADD COLUMN     "carListId" TEXT,
ADD COLUMN     "vin" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CarList_vin_key" ON "CarList"("vin");

-- AddForeignKey
ALTER TABLE "Financing" ADD CONSTRAINT "Financing_vin_fkey" FOREIGN KEY ("vin") REFERENCES "CarList"("vin") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Financing" ADD CONSTRAINT "Financing_carListId_fkey" FOREIGN KEY ("carListId") REFERENCES "CarList"("id") ON DELETE SET NULL ON UPDATE CASCADE;
