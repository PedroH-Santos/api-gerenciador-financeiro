/*
  Warnings:

  - The values [CANCELED] on the enum `StatusAccount` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `origin` on the `accounts` table. All the data in the column will be lost.
  - Added the required column `groupId` to the `registers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "StatusAccount_new" AS ENUM ('PAYED', 'PENDING', 'LATED');
ALTER TABLE "accounts" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "accounts" ALTER COLUMN "status" TYPE "StatusAccount_new" USING ("status"::text::"StatusAccount_new");
ALTER TYPE "StatusAccount" RENAME TO "StatusAccount_old";
ALTER TYPE "StatusAccount_new" RENAME TO "StatusAccount";
DROP TYPE "StatusAccount_old";
ALTER TABLE "accounts" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "origin";

-- AlterTable
ALTER TABLE "registers" ADD COLUMN     "groupId" TEXT NOT NULL;

-- DropEnum
DROP TYPE "OriginAccount";

-- AddForeignKey
ALTER TABLE "registers" ADD CONSTRAINT "registers_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
