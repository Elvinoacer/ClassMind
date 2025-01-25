"use server";

import { db } from "@/lib/prisma";

// export async function getUnitData({
//   institutionGroupId,
//   unitname,
//   studentId,
// }: {
//   institutionGroupId: string;
//   unitname: string;
//   studentId: string;
// }) {
//   const units = await db.unit.createMany({
//     data: {
//       unitname,
//       institutionGroupId,
//     },
//   });
//   revalidatePath(`/dashboard/${studentId}`);
// }

export async function addUnitData(
  institutionGroupId: string,
  formData: FormData
) {
  const unitname = formData.get("unitname") as string;

  if (!unitname) return `no unitname provided`;
  const units = await db.unit.create({
    data: {
      unitname,
      institutionGroupId,
    },
  });

  return units;
  // revalidatePath(`/`);
}
