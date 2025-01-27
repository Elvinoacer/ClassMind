import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const allCampus = await db.institutionCourse.findMany();
    return NextResponse.json(allCampus);
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function DELETE(req: Request) {
  const { campusId } = await req.json();
  try {
    const deletedCampus = await db.institutionCourse.delete({
      where: {
        id: campusId,
      },
    });
    return NextResponse.json({
      message: "Campus deleted successfully!",
      deletedCampus,
    });
  } catch (error) {
    return NextResponse.json(error);
  }
}
