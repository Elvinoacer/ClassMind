import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

//get students for specific group
export async function GET(request: Request, context: { params: any }) {
  const groupId = await context.params.groupId;

  try {
    const students = await db.student.findMany({
      where: {
        institutionGroupId: groupId,
      },
      include: {
        files: true,
      },
    });

    if (!students) {
      return NextResponse.json({ message: "No student found" });
    }
    return NextResponse.json(students);
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}

//CONNECT STUDENT
export async function POST(request: Request, context: { params: any }) {
  try {
    const { groupId } = await context.params;
    const data = await request.json();

    const group = await db.student.update({
      where: {
        id: data.id,
      },
      data: {
        institutionGroupId: groupId,
      },
    });

    return NextResponse.json(group);
  } catch (error) {
    console.log("Error occured");
    return NextResponse.json({ message: error });
  }
}
