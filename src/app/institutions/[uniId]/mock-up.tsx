"use client";
import GroupList from "@/components/groups-list";
import CircularColor from "@/components/material-ui/circular-progress";
import FixedContainer from "@/components/material-ui/container";
import CoursesList from "@/components/material-ui/folder-list";
import BasicStack from "@/components/material-ui/stack";
import HorizontalLinearStepper from "@/components/material-ui/stepper";
import { useAppSelector } from "@/hooks";
import { useGetUniversityQuery } from "@/rtk";
import { addInstitution } from "@/store/features/counterslice";
import { InstitutionCourse } from "@/types/prismatypes";
import { Modal } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function MockUp({ uniId }: { uniId: string }) {
  const dispatch = useDispatch();
  const uniSelectionIndex = useAppSelector(
    (state) => state.counter.uniSelectionIndex
  );

  const { data, isLoading } = useGetUniversityQuery(uniId);

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

  return (
    <div>
      {isLoading && (
        <Modal open className="flex items-center justify-center">
          <>
            <CircularColor color="info" size={50} />
          </>
        </Modal>
      )}
      {!isLoading && (
        <FixedContainer>
          <div className="pt-10"></div>
          <HorizontalLinearStepper>
            <div className="flex items-center justify-center mt-7">
              <div className="w-[90%] relative ">
                {uniSelectionIndex.index === 2 && (
                  <GroupList
                    groups={
                      data?.courses.find(
                        (course: InstitutionCourse) =>
                          course.id === uniSelectionIndex.id
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
      )}
    </div>
  );
}

export default MockUp;
