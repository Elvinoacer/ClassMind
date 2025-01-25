"use client";
import { useGetUniversityQuery } from "@/rtk";
import { navigateRegisterInstitution } from "@/store/features/counterslice";
import { FormTypesNav, InstitutionType } from "@/types/prismatypes";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function UniversityDetails({ uniId }: { uniId: string }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [university, setUniversity] = useState<null | InstitutionType>(null);
  const { data } = useGetUniversityQuery(uniId);

  useEffect(() => {
    if (data) {
      setUniversity(data?.university);
    }
  }, [data]);

  function handleNavigateGroup() {}
  function handleAddCourseNav() {
    dispatch(navigateRegisterInstitution(FormTypesNav.course));
    router.push("/institution-register");
  }
  return (
    <>
      <div className="font-bold text-3xl w-full flex justify-center mt-3">
        Courses
      </div>
      <div className="items-center w-full flex justify-center h-[100vh] ">
        {university && university!.courses!.length <= 0 && (
          <div className="mt-6 mb-10 flex w-full items-center justify-center">
            <div className="font-bold text-2xl w-[100vw] flex items-center justify-center">
              No courses yet, would you like to add
            </div>
          </div>
        )}

        <div className="flex w-full items-center justify-center h-full">
          {university &&
            university!.courses!.length > 0 &&
            university!.courses!.map((course) => (
              <div
                onClick={handleNavigateGroup}
                key={course.coursename}
                className="w-[300px] bg-blue-300 px-[60px] py-[30px] rounded-xl hover:cursor-pointer"
              >
                <div className="mr-3">Course name:</div>
                <div
                  key={course.coursename}
                  className="font-bold text-blue-950"
                >
                  {course.coursename}
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="flex justify-center w-full">
        Did not see your course, lets add
      </div>
      <div className="flex justify-center w-full mb-5 pb-9">
        <button
          onClick={handleAddCourseNav}
          className="bg-blue-500 px-4 py-2 rounded-full text-white mt-5"
        >
          Add Course
        </button>
      </div>
    </>
  );
}

export default UniversityDetails;
