-- CreateEnum
CREATE TYPE "Type_Addresses" AS ENUM ('Entrega', 'Faturamento');

-- CreateTable
CREATE TABLE "franchise_units" (
    "id" TEXT NOT NULL,
    "razao_social" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "manager_id" TEXT NOT NULL,

    CONSTRAINT "franchise_units_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "addresses" (
    "id" TEXT NOT NULL,
    "tipo" "Type_Addresses" NOT NULL DEFAULT 'Entrega',
    "cep" TEXT NOT NULL,
    "logradouro" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "complemento" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "franchise_unit_id" TEXT NOT NULL,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "franchise_units_cnpj_key" ON "franchise_units"("cnpj");

-- AddForeignKey
ALTER TABLE "franchise_units" ADD CONSTRAINT "franchise_units_manager_id_fkey" FOREIGN KEY ("manager_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_franchise_unit_id_fkey" FOREIGN KEY ("franchise_unit_id") REFERENCES "franchise_units"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
