"use client";
import CustomDashboard from "@/components/custom-dashboard";
import FilesDashboard from "@/components/files-dashboard";
import HeadTitle from "@/components/headTitle";
import Navigation from "@/components/navigation";
import PDFDisplay from "@/components/PDFDisplay";

import ChatScreen from "@/components/chats";
import SimpleBackdrop from "@/components/material-ui/backdrop-loading";
import CircularColor from "@/components/material-ui/circular-progress";
import BasicModal from "@/components/material-ui/modal";
import SideBar from "@/components/sidebar";
import { useAppSelector } from "@/hooks";
import { useGetGroupUnitsQuery, useGetStudentDetailsQuery } from "@/rtk";
import { addUnits } from "@/store/features/counterslice";
import { SideBar as SideBarEn, UnitType } from "@/types/prismatypes";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import PdfChat from "./sidemenu/pdfchat";
import UserDashboard from "./user-dashboard";

function getFavoritedByFiles(units: UnitType[]) {
  const files = units?.map((unit) => unit.files);

  console.log("ALL FILES", files);
}

function DashboardScreen({ studentId }: { studentId: string }) {
  const indexFileNav = useAppSelector((state) => state.counter.indexFileNav);

  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [uploader, setUploader] = useState("");
  const sideBarNav = useAppSelector((state) => state.counter.navSideBar);
  const displayFull = useAppSelector((state) => state.counter.displayFull);

  const pdfPicked = useAppSelector((state) => state.counter.pdf);

  const bodyRef = useRef<HTMLDivElement | null>(null);
  const { data: studentDetails } = useGetStudentDetailsQuery(studentId, {
    refetchOnMountOrArgChange: true,
  });
  const { data: units } = useGetGroupUnitsQuery(
    studentDetails?.InstitutionGroup?.id,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  getFavoritedByFiles(units);

  // let userFiles = [];
  // const files = units?.map((unit) => unit?.files);
  // if (files) {
  //   userFiles = files.filter((file) => file.studentId === studentId);
  // }

  const uploaderHandler = useCallback((val: string) => {
    setUploader(val);
  }, []);
  const freePlanAllocation =
    studentDetails?.InstitutionGroup?.freePlanAllocation;
  const storage = studentDetails?.InstitutionGroup?.storage;

  const availableStorage =
    freePlanAllocation && storage
      ? freePlanAllocation - storage
      : freePlanAllocation;

  useLayoutEffect(() => {
    if (units) {
      console.log("These are your units ", units);
      dispatch(addUnits(units));
    }
  }, [studentDetails, dispatch, units]);

  function toggleCurrentMode() {
    bodyRef.current?.classList.toggle("dark");
  }
  if (!studentId) {
    return <BasicModal />;
  }

  const userFavoritesFiles = studentDetails?.favorites;
  console.log("THIS STUDENT DETAILS", studentDetails?.files?.length);

  return (
    <div ref={bodyRef} className="classbody dark h-screen">
      <SideBar toggleModal={() => setShowModal(false)} />

      <section id="content" className="h-[100vh] ">
        <Navigation units={units} toggleMode={toggleCurrentMode} />

        <main className="h-full">
          <HeadTitle
            coursecode={
              studentDetails
                ? studentDetails.InstitutionGroup.InstitutionCourse.coursecode
                : ""
            }
            yeargroup={
              studentDetails ? studentDetails.InstitutionGroup.yeargroup : ""
            }
            institutionName={
              studentDetails?.InstitutionGroup.InstitutionCourse.Institution
                .institutionName
            }
            name={studentDetails ? studentDetails.firstname : ""}
          />

          <div className="table-data h-full ">
            {sideBarNav === SideBarEn.pdfChat && (
              <PdfChat name={studentDetails ? studentDetails.firstname : ""} />
            )}

            {sideBarNav === SideBarEn.communities && (
              <ChatScreen studentname={studentDetails?.firstname} />
            )}

            {sideBarNav === SideBarEn.dashboard && (
              <>
                <UserDashboard
                  userFavoritesFiles={userFavoritesFiles}
                  availableStorage={availableStorage}
                  freePlanAllocation={freePlanAllocation}
                  studentFiles={studentDetails?.files}
                  storage={storage}
                  handleShowModal={(val: string) => {
                    uploaderHandler(val);
                    setShowModal(true);
                    console.log(showModal);
                  }}
                  studentId={studentId}
                />
                <SimpleBackdrop
                  handleClose={() => setShowModal(false)}
                  openModal={showModal}
                  showSpinner={false}
                >
                  <PDFDisplay
                    uploader={uploader}
                    handleOpenModal={() => {
                      setShowModal(false);
                    }}
                    pdfPicked={pdfPicked}
                  />
                </SimpleBackdrop>
              </>
            )}

            {sideBarNav === SideBarEn.classstore && (
              <>
                {indexFileNav === undefined && (
                  <CustomDashboard
                    institutionGroupId={
                      studentDetails ? studentDetails?.InstitutionGroup.id : ""
                    }
                    studentId={studentId}
                    units={units ?? <CircularColor />}
                  />
                )}
                {displayFull === false && indexFileNav !== undefined && (
                  <FilesDashboard
                    availableStorage={availableStorage}
                    favoriteFiles={userFavoritesFiles}
                    groupId={
                      studentDetails?.InstitutionGroup?.units[0]
                        ?.institutionGroupId
                    }
                    handleShowModal={(val: string) => {
                      uploaderHandler(val);
                      setShowModal(true);
                    }}
                    studentId={studentId}
                    unit={units ? units[indexFileNav] : undefined}
                  />
                )}

                <SimpleBackdrop
                  handleClose={() => setShowModal(false)}
                  openModal={showModal}
                  showSpinner={false}
                >
                  <PDFDisplay
                    uploader={uploader}
                    handleOpenModal={() => {
                      setShowModal(false);
                    }}
                    pdfPicked={pdfPicked}
                  />
                </SimpleBackdrop>
              </>
            )}
          </div>
        </main>
      </section>
    </div>
  );
}

export default DashboardScreen;
