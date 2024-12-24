import { InstitutionType } from "@/types/prismatypes";

export async function createUniversity(req: InstitutionType) {
  try {
  } catch (error) {
    return { error: error };
  }
  return { data: req };
}
