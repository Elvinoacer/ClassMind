import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request, context: { params: any }) {
  const { groupId } = await context.params;
  const data = await req.json();
  try {
    const group = await db.institutionGroup.findFirst({
      where: {
        id: groupId,
      },
    });

    if (!group) {
      return NextResponse.json({ message: "Group not found" });
    }
    const units = await db.unit.createMany({
      data,
    });

    return NextResponse.json(units);
  } catch (error) {
    return NextResponse.json(error);
  }
}
