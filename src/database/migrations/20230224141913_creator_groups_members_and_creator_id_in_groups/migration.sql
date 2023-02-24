/*
  Warnings:

  - You are about to drop the column `creator` on the `groups` table. All the data in the column will be lost.
  - Added the required column `creatorId` to the `groups` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "groups" DROP COLUMN "creator",
ADD COLUMN     "creatorId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "GroupsMembers" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GroupsMembers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GroupsMembers" ADD CONSTRAINT "GroupsMembers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupsMembers" ADD CONSTRAINT "GroupsMembers_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "groups" ADD CONSTRAINT "groups_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
