"use client";
import GroupList from "@/components/groups-list";
import FixedContainer from "@/components/material-ui/container";
import CoursesList, {
  CourseListPropscourses,
} from "@/components/material-ui/folder-list";
import BasicStack, { BasicStackProps } from "@/components/material-ui/stack";
import HorizontalLinearStepper from "@/components/material-ui/stepper";
import { useAppSelector } from "@/hooks";
import { useGetUniversityQuery } from "@/rtk";
import { addInstitution } from "@/store/features/counterslice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const campuses: BasicStackProps[] = [
  {
    bgColor: "green-300",
    campusName: "MainCampus",
    key: "1",
  },
  {
    campusName: "Moyale",
    key: "2",
  },
  {
    campusName: "Kilimal",
    key: "3",
  },
  {
    campusName: "Maguru",
    key: "4",
  },
  {
    campusName: "Kipkabus",
    key: "5",
  },
];

const groups: string[] | [] = [
  "2020",
  "2021",
  "2022",
  "2023",
  "2024",
  "2025",
  "2026",
  "2027",
  "2028",
  "2029",
  "2030",
  "2031",
];

const courses: CourseListPropscourses[] = [
  {
    course: "Computer Science",
    courseCode: "CS",
  },
  {
    course: "Acturial Science",
    courseCode: "ACS",
  },
  {
    course: "Statistics",
    courseCode: "AST",
  },
  {
    course: "Microbiology",
    courseCode: "MIC",
  },
  {
    course: "Information Science",
    courseCode: "IS",
  },
];
function MockUp({ uniId }: { uniId: string }) {
  const dispatch = useDispatch();
  const uniSelectionIndex = useAppSelector(
    (state) => state.counter.uniSelectionIndex
  );
  console.log(uniSelectionIndex);

  const { data, isLoading } = useGetUniversityQuery(uniId);

  console.log(data);

  useEffect(() => {
    if (data) {
      dispatch(
        addInstitution({
          id: data.id,
          institutionName: data.institutionName,
          image: "",
          logo: "",
        })
      );
    }
  }, [data, dispatch]);

  console.log(uniSelectionIndex.id);

  console.log(
    data?.courses.find((crs) => crs.id === uniSelectionIndex.id)?.groups
  );

  return (
    <div>
      <FixedContainer>
        <div className="pt-10"></div>
        <HorizontalLinearStepper>
          <div className="flex items-center justify-center mt-7">
            <div className="w-[90%] relative ">
              {uniSelectionIndex.index === 2 && (
                <GroupList
                  groups={
                    data?.courses.find(
                      (course) => course.id === uniSelectionIndex.id
                    )?.groups || []
                  }
                />
              )}
              {uniSelectionIndex.index === 1 && (
                <CoursesList courses={data?.courses} />
              )}
              {uniSelectionIndex.index === 0 && (
                <BasicStack
                  uniId={uniId}
                  isLoading={isLoading}
                  campuses={data?.campuses || []}
                />
              )}
            </div>
          </div>
        </HorizontalLinearStepper>
      </FixedContainer>
    </div>
  );
}

export default MockUp;
