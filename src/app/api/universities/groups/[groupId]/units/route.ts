import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  context: { params: Promise<{ groupId: string }> }
) {
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
    if (Array.isArray(data)) {
      const units = await db.unit.createMany({
        data,
      });
      return NextResponse.json(units);
    } else {
      const unit = await db.unit.create({
        data,
        include: {
          files: {
            include: {
              favoritedBy: true,
              Student: true,
            },
          },
        },
      });
      return NextResponse.json(unit);
    }
  } catch (error) {
    return NextResponse.json(error);
  }
}
