"use server";

import { NextResponse } from "next/server";
import { s3Client, uploadFileToS3 } from "../api/universities/uploadS3/route";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/prisma";
import { FileContent } from "@/types/prismatypes";

export async function handleSubmitFormAction(formData: FormData) {
  const file = formData.get("logo");
  try {
    // custom validations
    if (!file) {
      return NextResponse.json({ error: "file is required" }, { status: 400 });
    }

    //buffering and storing inside the array

    const fileBuffer = Buffer.from(await file.arrayBuffer());

    // const fileName = await uploadFileToS3(fileBuffer, file.name);
    // console.log("Success", fileName);
    const ourPromise = await new Promise((resolve) =>
      setTimeout(() => {
        resolve("Hello world!");
      }, 5000)
    );

    console.log(ourPromise);
  } catch (error) {
    console.error("Error Elvin", error);
  }
}

export async function deleteFile(item: FileContent) {
  const deleteParams = {
    Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME!,
    Key: `elvinTrial/${item.filename}`,
  };
  try {
    const updatedGroup = await db.institutionGroup.update({
      where: {
        id: item.Student.institutionGroupId,
      },
      data: {
        storage: { decrement: item.actualFileSize },
      },
    });

    console.log("UPDATED GROUP", updatedGroup);
    const deletedAwsFile = await s3Client.send(
      new DeleteObjectCommand(deleteParams)
    );
    console.log("DELETED FROM S3", deletedAwsFile);

    const deletedDBFile = await db.file.delete({
      where: {
        id: item.id,
      },
    });

    console.log("deletedDBFile", deletedDBFile);

    revalidatePath("/");
  } catch (error) {
    throw error;
  }
}
