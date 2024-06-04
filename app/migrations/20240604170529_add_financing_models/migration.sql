-- CreateTable
CREATE TABLE "FinancingPersonal" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "ssnItin" TEXT NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FinancingPersonal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FinancingContactInfo" (
    "id" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zip" TEXT NOT NULL,

    CONSTRAINT "FinancingContactInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Financing" (
    "id" TEXT NOT NULL,
    "personalId" TEXT NOT NULL,
    "contactId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Financing_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Financing" ADD CONSTRAINT "Financing_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "FinancingPersonal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Financing" ADD CONSTRAINT "Financing_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "FinancingContactInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
