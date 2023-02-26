/*
  Warnings:

  - Changed the type of `dayDueDate` on the `accounts` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "dayDueDate",
ADD COLUMN     "dayDueDate" INTEGER NOT NULL;
