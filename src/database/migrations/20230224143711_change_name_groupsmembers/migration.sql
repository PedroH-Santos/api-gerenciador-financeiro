/*
  Warnings:

  - You are about to drop the `GroupsMembers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "GroupsMembers" DROP CONSTRAINT "GroupsMembers_groupId_fkey";

-- DropForeignKey
ALTER TABLE "GroupsMembers" DROP CONSTRAINT "GroupsMembers_userId_fkey";

-- DropTable
DROP TABLE "GroupsMembers";

-- CreateTable
CREATE TABLE "groupsMembers" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "groupsMembers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "groupsMembers" ADD CONSTRAINT "groupsMembers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "groupsMembers" ADD CONSTRAINT "groupsMembers_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
