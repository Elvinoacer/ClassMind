-- CreateTable
CREATE TABLE "Institution" (
    "id" TEXT NOT NULL,
    "institutionName" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "campus" TEXT NOT NULL,

    CONSTRAINT "Institution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InstitutionCourse" (
    "id" TEXT NOT NULL,
    "coursename" TEXT NOT NULL,
    "coursecode" TEXT NOT NULL,
    "institutionId" TEXT,

    CONSTRAINT "InstitutionCourse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InstitutionGroup" (
    "id" TEXT NOT NULL,
    "institutionCourseId" TEXT,
    "yeargroup" TEXT NOT NULL,

    CONSTRAINT "InstitutionGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "institutionGroupId" TEXT,
    "email" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Unit" (
    "id" TEXT NOT NULL,
    "institutionGroupId" TEXT,
    "unitname" TEXT NOT NULL,

    CONSTRAINT "Unit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "File" (
    "id" TEXT NOT NULL,
    "studentId" TEXT,
    "unitId" TEXT,
    "filename" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "filesize" TEXT NOT NULL,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");

-- AddForeignKey
ALTER TABLE "InstitutionCourse" ADD CONSTRAINT "InstitutionCourse_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "Institution"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstitutionGroup" ADD CONSTRAINT "InstitutionGroup_institutionCourseId_fkey" FOREIGN KEY ("institutionCourseId") REFERENCES "InstitutionCourse"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_institutionGroupId_fkey" FOREIGN KEY ("institutionGroupId") REFERENCES "InstitutionGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Unit" ADD CONSTRAINT "Unit_institutionGroupId_fkey" FOREIGN KEY ("institutionGroupId") REFERENCES "InstitutionGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("id") ON DELETE SET NULL ON UPDATE CASCADE;
