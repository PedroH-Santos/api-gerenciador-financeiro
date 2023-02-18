/*
  Warnings:

  - You are about to drop the `Registers` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "TypeAccount" AS ENUM ('PARCEL', 'RECURRENT');

-- CreateEnum
CREATE TYPE "OriginAccount" AS ENUM ('GROUP', 'INDIVIDUAL');

-- CreateEnum
CREATE TYPE "StatusAccount" AS ENUM ('PAYED', 'PENDING', 'CANCELED');

-- DropTable
DROP TABLE "Registers";

-- CreateTable
CREATE TABLE "registers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "status" "StatusRegister" NOT NULL DEFAULT 'DEPOSIT',

    CONSTRAINT "registers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "type" "TypeAccount" NOT NULL DEFAULT 'RECURRENT',
    "origin" "OriginAccount" NOT NULL DEFAULT 'INDIVIDUAL',
    "installments" INTEGER NOT NULL,
    "status" "StatusAccount" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);
