import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

//get university + courses
export async function GET(req: Request, context: { params: any }) {
  const { uniid } = await context.params;
  console.log(uniid);
  try {
    const university = await db.institution.findUnique({
      where: {
        id: uniid,
      },
      include: {
        campuses: true,
        courses: {
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
        },
      },
    });
    if (!university) {
      return NextResponse.json({
        message: "University not found",
      });
    }
    return NextResponse.json(university);
  } catch (error) {
    return NextResponse.json({
      error,
    });
  }
}

//CREATE COURSE
export async function POST(req: Request, context: { params: any }) {
  const { uniid } = await context.params;
  const data = await req.json();
  try {
    const university = await db.institution.findFirst({
      where: {
        id: uniid,
      },
    });
    if (!university) {
      return NextResponse.json({
        message: "university not found",
      });
    }
    const course = await db.institutionCourse.findFirst({
      where: {
        institutionId: university.id,
        coursename: data.coursename,
      },
    });

    if (!course) {
      const course = await db.institutionCourse.create({
        data: data,
      });

      return NextResponse.json(course);
    }
    return NextResponse.json(course);
  } catch (error) {
    return NextResponse.json({
      error,
    });
  }
}

export async function PATCH(req: Request, context: { params: any }) {
  const { uniid } = await context.params;
  const { campusname } = await req.json();

  try {
    const institution = await db.institution.findFirst({
      where: {
        id: uniid,
      },
    });

    if (!institution) {
      return NextResponse.json({
        message: `No institution found for id: ${uniid} was found`,
      });
    }

    const institutionFound = await db.institution.findFirst({
      where: {
        campuses: {
          some: { campusname },
        },
      },
      include: { campuses: true },
    });

    if (institutionFound) {
      return NextResponse.json(institutionFound);
    }

    const updatedInstitution = await db.institution.update({
      where: {
        id: institution.id,
      },
      data: {
        campuses: {
          create: {
            campusname,
          },
        },
      },
      include: {
        campuses: true,
      },
    });

    return NextResponse.json(updatedInstitution);
  } catch (err) {
    return NextResponse.json(err);
  }
}
