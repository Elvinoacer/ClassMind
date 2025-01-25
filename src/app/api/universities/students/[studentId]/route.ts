import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

//get student and his files
export async function GET(
  req: Request,
  context: { params: Promise<{ studentId: string }> }
) {
  const { studentId } = await context.params;
  try {
    const student = await db.student.findFirst({
      where: {
        id: studentId,
      },
      include: {
        favorites: { include: { favoritedBy: true, Student: true } },
        InstitutionGroup: {
          include: {
            InstitutionCourse: {
              include: {
                Institution: true,
              },
            },
            units: true,
          },
        },
        files: {
          include: { favoritedBy: true },
        },
      },
    });
    if (!student) {
      return NextResponse.json({ status: 404 });
    }

    return NextResponse.json(student);
  } catch (error) {
    return NextResponse.json(error);
  }
}

//create file for a student

export async function POST(
  req: Request,
  context: { params: Promise<{ studentId: string }> }
) {
  const { studentId } = await context.params;
  const data = await req.json();

  const groupId = data.groupId;
  try {
    if (!groupId) return NextResponse.json("No Group Id Provided");
    const student = await db.student.findFirst({
      where: {
        id: studentId,
      },
    });
    if (!student) {
      return NextResponse.json({ message: "Student not found" });
    }

    const updatedGroup = await db.institutionGroup.update({
      where: {
        id: groupId,
      },
      data: {
        storage: { increment: data.fileSizeStorage },
      },
    });

    if (!updatedGroup) {
      return NextResponse.json("No Group found");
    }

    const transData = {
      filename: data.filename,
      filesize: data.filesize,
      unitId: data.unitId,
      studentId,
      url: data.url,
      actualFileSize: data.fileSizeStorage,
    };
    const file = await db.file.create({
      data: transData,
    });
    return NextResponse.json(file);
  } catch (error) {
    return NextResponse.json({ message: "There is an error", error });
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ studentId: string }> }
) {
  const fileId = await req.json();
  const { studentId } = await context.params;

  //also the student id

  try {
    const student = await db.student.findFirst({
      where: {
        id: studentId,
      },
    });

    if (!student) return NextResponse.json({ message: "student not found" });
    const file = await db.file.delete({
      where: {
        id: fileId,
        studentId: studentId,
      },
    });

    return NextResponse.json({
      message: "file deleted successfully",
      file: file,
    });
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ studentId: string }> }
) {
  const { studentId } = await context.params;
  const { fileId, action }: { fileId: string; action: "Fav" | "unFav" } =
    await req.json();

  try {
    if (action === "Fav") {
      // Favorite a file
      await db.student.update({
        where: { id: studentId },
        data: {
          favorites: {
            connect: { id: fileId },
          },
        },
      });
      return NextResponse.json({ updated: true });
    } else {
      // Unfavorite a file
      await db.student.update({
        where: { id: studentId },
        data: {
          favorites: {
            disconnect: { id: fileId },
          },
        },
      });
      return NextResponse.json({ updated: false });
    }
  } catch (error) {
    return NextResponse.json(error);
  }
}
