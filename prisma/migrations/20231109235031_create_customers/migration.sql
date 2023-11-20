/*
  Warnings:

  - The `tipo` column on the `addresses` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Type_Address" AS ENUM ('Entrega', 'Faturamento');

-- CreateEnum
CREATE TYPE "Type_Phone" AS ENUM ('Celular', 'Residencial', 'Trabalho', 'Outros');

-- DropForeignKey
ALTER TABLE "addresses" DROP CONSTRAINT "addresses_franchise_unit_id_fkey";

-- AlterTable
ALTER TABLE "addresses" ADD COLUMN     "customer_id" TEXT,
DROP COLUMN "tipo",
ADD COLUMN     "tipo" "Type_Address" NOT NULL DEFAULT 'Entrega',
ALTER COLUMN "franchise_unit_id" DROP NOT NULL;

-- DropEnum
DROP TYPE "Type_Addresses";

-- CreateTable
CREATE TABLE "phone_numbers" (
    "id" TEXT NOT NULL,
    "typePhone" "Type_Phone" NOT NULL DEFAULT 'Celular',
    "ddd" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "custumerId" TEXT,

    CONSTRAINT "phone_numbers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "cpf" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "customers_email_key" ON "customers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "customers_cpf_key" ON "customers"("cpf");

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_franchise_unit_id_fkey" FOREIGN KEY ("franchise_unit_id") REFERENCES "franchise_units"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "phone_numbers" ADD CONSTRAINT "phone_numbers_custumerId_fkey" FOREIGN KEY ("custumerId") REFERENCES "customers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
