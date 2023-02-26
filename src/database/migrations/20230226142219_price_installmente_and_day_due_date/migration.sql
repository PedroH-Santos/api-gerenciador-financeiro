/*
  Warnings:

  - You are about to drop the column `dueDate` on the `accounts` table. All the data in the column will be lost.
  - Added the required column `dayDueDate` to the `accounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priceInstallments` to the `accounts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "dueDate",
ADD COLUMN     "dayDueDate" TEXT NOT NULL,
ADD COLUMN     "priceInstallments" DOUBLE PRECISION NOT NULL;
