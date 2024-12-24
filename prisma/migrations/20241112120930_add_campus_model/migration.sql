/*
  Warnings:

  - You are about to drop the column `campus` on the `Institution` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Institution" DROP COLUMN "campus";

-- AlterTable
ALTER TABLE "InstitutionCourse" ADD COLUMN     "campusId" TEXT;

-- CreateTable
CREATE TABLE "Campus" (
    "id" TEXT NOT NULL,
    "campusname" TEXT NOT NULL,
    "institutionId" TEXT,

    CONSTRAINT "Campus_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Campus" ADD CONSTRAINT "Campus_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "Institution"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstitutionCourse" ADD CONSTRAINT "InstitutionCourse_campusId_fkey" FOREIGN KEY ("campusId") REFERENCES "Campus"("id") ON DELETE SET NULL ON UPDATE CASCADE;
