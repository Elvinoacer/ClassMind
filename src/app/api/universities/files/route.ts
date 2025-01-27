import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const files = await db.file.findMany();
    return NextResponse.json(files);
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}

// /DELETE ALL FILES
export async function DELETE(req: Request) {
  const { fileId } = await req.json();
  try {
    const files = await db.file.deleteMany({ where: { id: fileId } });
    return NextResponse.json(files);
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
