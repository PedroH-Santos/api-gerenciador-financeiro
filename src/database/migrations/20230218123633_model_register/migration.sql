-- CreateEnum
CREATE TYPE "StatusRegister" AS ENUM ('WITHDRAW', 'DEPOSIT');

-- CreateTable
CREATE TABLE "Registers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "status" "StatusRegister" NOT NULL DEFAULT 'DEPOSIT',

    CONSTRAINT "Registers_pkey" PRIMARY KEY ("id")
);
