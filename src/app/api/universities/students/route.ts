import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();
  try {
    const studentExist = await db.student.findUnique({
      where: {
        email: data.email,
      },
      include: {
        InstitutionGroup: {
          include: {
            units: true,
          },
        },
        files: true,
      },
    });
    if (studentExist) {
      return NextResponse.json({ student: studentExist, exist: true });
    }
    const student = await db.student.create({
      data,
    });

    return NextResponse.json({ student, exist: false });
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function GET() {
  try {
    const students = await db.student.findMany({
      include: {
        favorites: true,
        InstitutionGroup: {
          include: {
            units: {
              include: { files: true },
            },
          },
        },
      },
    });

    return NextResponse.json(students);
  } catch (error) {
    return NextResponse.json(error);
  }
}

//DELETE ALL STUDENTS
export async function DELETE() {
  try {
    const deletedStudents = await db.student.deleteMany();
    return NextResponse.json({
      deletedStudents,
      message: "Successfully deleted all students",
    });
  } catch (error) {
    return NextResponse.json(error);
  }
}

// delete all files
// export async function DELETE(req: Request) {
//   try {
//     const deletedFiles = await db.file.deleteMany();
//     return NextResponse.json({
//       message: `All ${deletedFiles.count} files deleted successfully`,
//     });
//   } catch (error) {
//     return NextResponse.json(error);
//   }
// }
