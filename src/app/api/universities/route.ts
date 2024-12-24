import { InstitutionGroup } from "./../../../types/prismatypes";
import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { universities } from "@/app/universities";

//GET ALL UNIVERSITIES
export async function GET(req: Request) {
  const universities = await db.institution
    .findMany
    // {
    // orderBy: {
    //   institutionName: "asc",
    // },
    // }
    ();
  return NextResponse.json(universities);
}

// // export async function POST(req: Request) {
// //   const formData = await req.formData();
// //   try {
// //     const file = formData.get("file");
// //     // const data = await req.json();
// //     // const formData = await req.formData();
// //     // const logo = formData.get("image");
// //     // const image =  formData.get("image");

// //     // const newUniversity = {
// //     //   institutionName: formData.get("institutionName"),
// //     //   logo: formData.get("logo"),
// //     //   image: formData.get("image"),
// //     //   campus: formData.get("campus"),
// //     //   courses: JSON.parse(formData.get("courses")),
// //     // };

// //     // console.log(logo);

// //     console.log(file);

// //     return NextResponse.json({ message: "Your file" });
// //   } catch (e) {
// //     return NextResponse.json({ error: "There is an error Elvin", e });
// //   }
// // }

// //create institution

// export async function POST(req) {
//   try {
//     if (req.method !== "POST") {
//       throw { error: "Method not allowed Elvin" };
//     }

//     const { institutionName, logo, image, campus } = await req.json();

//     const transData = { institutionName, logo, image };

//     const university = await db.institution.create({
//       data: transData,
//     });
//     const updatedUni = await db.institution.update({
//       where: {
//         id: university.id,
//       },
//       data: {
//         campuses: {
//           create: {
//             campusname: campus,
//           },
//         },
//       },
//     });
//     return NextResponse.json(updatedUni);
//   } catch (error) {
//     return NextResponse.json({ error: error });
//   }
// }

export async function POST(request: Request) {
  console.log("Requested");
  try {
    const unis = await db.institution.createMany({
      data: universities,
    });
    return NextResponse.json(unis);
  } catch (error) {
    return NextResponse.json({ errorElvn: error });
  }
}

// delete all groups{}

export async function DELETE() {
  try {
    const deletedCampuses = await db.campus.deleteMany();
    return NextResponse.json({
      deletedCampuses,
      message: "All campuses deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(error);
  }
}

// reset the group institution storage size

export async function PUT(req: Request) {
  const { groupId } = await req.json();
  try {
    if (!groupId) {
      return NextResponse.json("No Group ID PROVIDED");
    }
    const updatedGroup = await db.institutionGroup.update({
      where: {
        id: groupId,
      },
      data: {
        storage: 0,
      },
    });

    return NextResponse.json(updatedGroup);
  } catch (error) {
    return NextResponse.json(error);
  }
}
