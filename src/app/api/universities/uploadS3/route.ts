import { NextResponse } from "next/server";
import { uploadFileToS3 } from "./helper";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
export async function POST(req) {
  try {
    if (req.method !== "POST") {
      throw { error: "Method not allowed Elvin" };
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
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
        logo.name,
        logo.type
      );
      const { fileName: imageName, url: imageUrl } = await uploadFileToS3(
        imageBuffer,
        image.name,
        image.type
      );

      return NextResponse.json({ logoName, imageName, logoUrl, imageUrl });
    }
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
