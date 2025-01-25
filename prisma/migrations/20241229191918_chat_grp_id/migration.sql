/*
  Warnings:

  - Added the required column `groupId` to the `UserMessage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "groupId" TEXT;

-- AlterTable
ALTER TABLE "UserMessage" ADD COLUMN     "groupId" TEXT NOT NULL;
