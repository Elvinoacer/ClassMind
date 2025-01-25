"use server";

import { db } from "@/lib/prisma";
import { FileTypeDB } from "@/types/prismatypes";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { s3Client } from "../api/universities/uploadS3/helper";

export async function handleSubmitFormAction(formData: FormData) {
  const file = formData.get("logo");
  try {
    // custom validations
    if (!file) {
      return NextResponse.json({ error: "file is required" }, { status: 400 });
    }

    //buffering and storing inside the array

    // const fileBuffer = Buffer.from(await file.arrayBuffer());

    // const fileName = await uploadFileToS3(fileBuffer, file.name);

    await new Promise((resolve) =>
      setTimeout(() => {
        resolve("Hello world!");
      }, 5000)
    );
  } catch (error) {
    console.error("Error Elvin", error);
  }
}

export async function deleteFile(item: FileTypeDB) {
  const deleteParams = {
    Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME!,
    Key: `elvinTrial/${item.filename}`,
  };
  try {
    await db.institutionGroup.update({
      where: {
        id: item?.groupId,
      },
      data: {
        storage: { decrement: item.actualFileSize },
      },
    });

    await s3Client.send(new DeleteObjectCommand(deleteParams));

    await db.file.delete({
      where: {
        id: item.id,
      },
    });

    revalidatePath("/");
  } catch (error) {
    throw error;
  }
}

export async function authorizeUser() {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const isAuth = await isAuthenticated();
  const user = await getUser();

  return { isAuth, user };
}
