-- AlterTable
ALTER TABLE "File" ADD COLUMN     "actualFileSize" DOUBLE PRECISION DEFAULT 0,
ADD COLUMN     "favoritedById" TEXT;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_favoritedById_fkey" FOREIGN KEY ("favoritedById") REFERENCES "Student"("id") ON DELETE SET NULL ON UPDATE CASCADE;
