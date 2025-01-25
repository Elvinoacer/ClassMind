import { universities } from "@/app/universities";
import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

// // CREATE ALL THE AVAILABLE UNIVERSITIES
export async function POST() {
  try {
    const unis = await db.institution.createMany({
      data: universities,
    });
    return NextResponse.json(unis);
  } catch (error) {
    return NextResponse.json({ errorElvn: error });
  }
}

// // DELETE ALL THE AVAILABLE UNIVERSITIES

export async function DELETE() {
  try {
    const unis = await db.institution.deleteMany();
    return NextResponse.json(unis);
  } catch (error) {
    return NextResponse.json({ errorElvn: error });
  }
}
