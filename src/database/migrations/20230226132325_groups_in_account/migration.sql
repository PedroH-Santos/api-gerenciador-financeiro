/*
  Warnings:

  - Added the required column `groupId` to the `accounts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "accounts" ADD COLUMN     "groupId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
