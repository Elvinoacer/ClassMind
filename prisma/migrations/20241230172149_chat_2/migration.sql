/*
  Warnings:

  - You are about to drop the column `groupId` on the `UserMessage` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_userMessageId_fkey";

-- AlterTable
ALTER TABLE "Message" ALTER COLUMN "userMessageId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "UserMessage" DROP COLUMN "groupId";

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_userMessageId_fkey" FOREIGN KEY ("userMessageId") REFERENCES "UserMessage"("id") ON DELETE SET NULL ON UPDATE CASCADE;
