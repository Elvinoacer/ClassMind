import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const message = await req.json();

  try {
    if (!message) {
      return NextResponse.json("Please provide something ");
    }

    const msg = await db.message.create({
      data: {
        studentId: message.studentId,
        user: { create: { name: message?.user?.name } },
        type: message.type,
        picture: message.picture,
        content: message.content,
        groupId: message.groupId,
      },
      include: { user: true },
    });
    return NextResponse.json(msg);
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function DELETE() {
  try {
    const deletedMessages = await db.message.deleteMany();

    return NextResponse.json(deletedMessages);
  } catch (error) {
    return NextResponse.json(error);
  }
}
