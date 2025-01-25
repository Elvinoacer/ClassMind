import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

//GET GROUPS
export async function GET(
  req: Request,
  context: { params: Promise<{ courseId: string }> }
) {
  const { courseId } = await context.params;
  try {
    const course = await db.institutionCourse.findFirst({
      where: {
        id: courseId,
      },
      include: {
        groups: {
          include: {
            students: true,
            units: {
              include: {
                files: true,
              },
            },
          },
        },
      },
    });

    if (!course) {
      return NextResponse.json({
        message: "Course not found",
      });
    }
    return NextResponse.json({ course });
  } catch (error) {
    return NextResponse.json({
      error,
    });
  }
}

// CREATE GROUP

export async function POST(
  request: Request,
  context: { params: Promise<{ courseId: string }> }
) {
  const { courseId } = await context.params;
  const data = await request.json();
  try {
    const course = await db.institutionCourse.findFirst({
      where: {
        id: courseId,
      },
    });
    if (!course)
      return NextResponse.json({
        message: "Course not found",
      });
    const group = await db.institutionGroup.findFirst({
      where: {
        institutionCourseId: course.id,
        yeargroup: data.yeargroup,
      },
    });

    if (!group) {
      const group = await db.institutionGroup.create({
        data,
      });
      return NextResponse.json(group);
    }
    return NextResponse.json(group);
  } catch (error) {
    return NextResponse.json(error);
  }
}
