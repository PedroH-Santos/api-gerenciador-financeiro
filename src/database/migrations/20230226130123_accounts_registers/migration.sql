-- CreateTable
CREATE TABLE "accountsRegisters" (
    "id" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "installments" INTEGER NOT NULL,
    "status" "StatusAccount" NOT NULL DEFAULT 'PENDING',
    "accountId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "accountsRegisters_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "accountsRegisters" ADD CONSTRAINT "accountsRegisters_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
