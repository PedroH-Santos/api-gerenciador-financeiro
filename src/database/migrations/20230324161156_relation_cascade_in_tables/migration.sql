-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_groupId_fkey";

-- DropForeignKey
ALTER TABLE "accountsRegisters" DROP CONSTRAINT "accountsRegisters_accountId_fkey";

-- DropForeignKey
ALTER TABLE "groupsMembers" DROP CONSTRAINT "groupsMembers_groupId_fkey";

-- DropForeignKey
ALTER TABLE "registers" DROP CONSTRAINT "registers_groupId_fkey";

-- DropForeignKey
ALTER TABLE "usersTokens" DROP CONSTRAINT "usersTokens_userId_fkey";

-- AddForeignKey
ALTER TABLE "usersTokens" ADD CONSTRAINT "usersTokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "groupsMembers" ADD CONSTRAINT "groupsMembers_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registers" ADD CONSTRAINT "registers_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accountsRegisters" ADD CONSTRAINT "accountsRegisters_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;
