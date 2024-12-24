import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

//get all file for a specific unit
export async function GET(req: Request, context: { params: any }) {
  try {
    const { unitId } = await context.params;

    const unit = await db.unit.findFirst({
      where: {
        id: unitId,
      },

      include: {
        files: true,
      },
    });
    return NextResponse.json(unit);
  } catch (error) {
    return NextResponse.json({ errorMessage: error });
  }
}

/**
 * create File
 */

export async function POST(req: Request, context: { params: any }) {
  const { unitId } = await context.params;

  const data = await req.json();

  const unit = await db.unit.findFirst({
    where: {
      id: unitId,
    },
  });

  if (!unit) {
    return NextResponse.json({ messag: "Unit not found" });
  }

  try {
    const file = await db.file.create({
      data,
    });

    return NextResponse.json(file);
  } catch (error) {
    return NextResponse.json({ errorMessage: error });
  }
}
