import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ studentId: string }> }
) {
  const { studentId } = await context.params;
  try {
    const student = await db.student.findUnique({
      where: {
        id: studentId,
      },
      include: {
        InstitutionGroup: {
          include: {
            InstitutionCourse: {
              include: {
                Institution: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(student);
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ studentId: string }> }
) {
  const { studentId } = await context.params;
  try {
    const deletedStudent = await db.student.delete({
      where: {
        id: studentId,
      },
    });
    return NextResponse.json({
      message: "Student deleted successfully!",
      deletedStudent,
    });
  } catch (error) {
    return NextResponse.json(error);
  }
}
