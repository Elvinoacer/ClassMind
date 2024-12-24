/*
  Warnings:

  - You are about to drop the column `favoritedById` on the `File` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_favoritedById_fkey";

-- AlterTable
ALTER TABLE "File" DROP COLUMN "favoritedById";

-- CreateTable
CREATE TABLE "_FavoritedBy" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FavoritedBy_AB_unique" ON "_FavoritedBy"("A", "B");

-- CreateIndex
CREATE INDEX "_FavoritedBy_B_index" ON "_FavoritedBy"("B");

-- AddForeignKey
ALTER TABLE "_FavoritedBy" ADD CONSTRAINT "_FavoritedBy_A_fkey" FOREIGN KEY ("A") REFERENCES "File"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoritedBy" ADD CONSTRAINT "_FavoritedBy_B_fkey" FOREIGN KEY ("B") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
