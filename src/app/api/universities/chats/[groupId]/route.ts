import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ groupId: string }> }
) {
  const { groupId } = await context.params;
  try {
    const messages = await db.message.findMany({
      where: {
        groupId: groupId,
      },
      include: {
        user: true,
      },
    });

    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json(error);
  }
}
