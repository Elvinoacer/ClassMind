import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

//get all the units and files
export async function GET(
  req: Request,
  context: { params: Promise<{ groupId: string }> }
) {
  const { groupId } = await context.params;

  try {
    const units = await db.unit.findMany({
      where: {
        institutionGroupId: groupId,
      },
      include: {
        files: {
          include: {
            favoritedBy: true,
            Student: true,
          },
        },
      },
    });

    if (!units) {
      return NextResponse.json({
        message: "units not found",
      });
    }

    return NextResponse.json(units);
  } catch (error) {
    return NextResponse.json(error);
  }
}

//create units
export async function POST(
  req: Request,
  context: { params: Promise<{ groupId: string }> }
) {
  try {
    const data = await req.json();
    const { groupId } = await context.params;
    const group = await db.institutionGroup.findFirst({
      where: {
        id: groupId,
      },
    });

    if (!group) {
      return NextResponse.json({
        message: "group not found",
      });
    }

    const transData = { ...data, institutionGroupId: group.id };

    const unit = await db.unit.create({
      data: transData,
    });

    return NextResponse.json(unit);
  } catch (error) {
    return NextResponse.json(error);
  }
}

// delete unit

export async function DELETE(
  req: Request,
  context: { params: Promise<{ groupId: string }> }
) {
  const { unitId } = await req.json();
  const { groupId } = await context.params;
  try {
    const unit = await db.unit.delete({
      where: {
        id: unitId,
        institutionGroupId: groupId,
      },
    });
    if (!unit) {
      return NextResponse.json({
        message: "unit not found",
      });
    }

    return NextResponse.json({
      message: "unit successfully deleted",
    });
  } catch (error) {
    return NextResponse.json(error);
  }
}
