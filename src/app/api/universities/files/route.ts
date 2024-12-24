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
export async function DELETE() {
  try {
    const files = await db.file.deleteMany();
    return NextResponse.json(files);
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
