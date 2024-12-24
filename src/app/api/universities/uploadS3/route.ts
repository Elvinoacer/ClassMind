import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

export const s3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_S3_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function uploadFileToS3(fileBuffer, filename, fileType) {
  const params = {
    Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
    Key: `elvinTrial/${filename}`,
    Body: fileBuffer,
    ContentType: fileType,
  };

  const command = new PutObjectCommand(params);
  await s3Client.send(command);

  return {
    fileName: params.Key,
    url: `https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${params.Key}`,
  };
}

export async function POST(req) {
  try {
    if (req.method !== "POST") {
      throw { error: "Method not allowed Elvin" };
    }
    const formData = await req.formData();

    const file = formData.get("file");
    const logo = formData.get("logo");
    const image = formData.get("image");

    //buffering and storing inside the array

    if (file) {
      const fileBuffer = Buffer.from(await file.arrayBuffer());

      const { fileName, url } = await uploadFileToS3(
        fileBuffer,
        file.name,
        file.type
      );

      return NextResponse.json({ url, fileName });
    }

    if (image && logo) {
      const logoBuffer = Buffer.from(await logo.arrayBuffer());
      const imageBuffer = Buffer.from(await image.arrayBuffer());

      const { fileName: logoName, url: logoUrl } = await uploadFileToS3(
        logoBuffer,
        logo.name
      );
      const { fileName: imageName, url: imageUrl } = await uploadFileToS3(
        imageBuffer,
        image.name
      );

      return NextResponse.json({ logoName, imageName, logoUrl, imageUrl });
    }
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
