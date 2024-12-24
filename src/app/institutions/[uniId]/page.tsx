import { useGetUniversityQuery } from "@/rtk";
import React from "react";
import UniversityDetails from "./universityDetails";
import MockUp from "./mock-up";

async function Page({ params }) {
  const { uniId } = await params;

  return (
    <div>
      <MockUp uniId={uniId} />
    </div>
  );
}

export default Page;
