"use client";
import CustomDashboard from "@/components/custom-dashboard";
import FilesDashboard from "@/components/files-dashboard";
import HeadTitle from "@/components/headTitle";
import Navigation from "@/components/navigation";
import PDFDisplay from "@/components/PDFDisplay";

import ImageList from "@/components/image-list";
import SimpleBackdrop from "@/components/material-ui/backdrop-loading";
import CircularColor from "@/components/material-ui/circular-progress";
import BasicModal from "@/components/material-ui/modal";
import SideBar from "@/components/sidebar";
import { useAppSelector } from "@/hooks";
import { useGetGroupUnitsQuery, useGetStudentDetailsQuery } from "@/rtk";
import { addDBUnits, addFavFiles } from "@/store/features/counterslice";
import { SideBar as SideBarEn } from "@/types/prismatypes";
import { Modal } from "@mui/material";
import { redirect } from "next/navigation";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import PdfChat from "./sidemenu/pdfchat";
import UserDashboard from "./user-dashboard";

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
    if (studentDetails?.status === 404) {
      alert("Student not found");
      redirect("/login");
    }
    if (units) {
      dispatch(addDBUnits(units));
    }
    if (studentDetails && studentDetails.status !== 404) {
      sessionStorage.setItem(
        "ChatScreen",
        JSON.stringify({
          picture: studentDetails?.picture,
          studentId,
          courseCode: studentDetails
            ? studentDetails.InstitutionGroup?.InstitutionCourse.coursecode
            : "",
          yearGroup: studentDetails
            ? studentDetails.InstitutionGroup.yeargroup
            : "",
          institutionGroupId: studentDetails
            ? studentDetails?.InstitutionGroup.id
            : "",
          studentname: studentDetails?.firstname,
        })
      );

      dispatch(addFavFiles(studentDetails?.favorites));
    }
  }, [studentDetails, dispatch, studentId, units]);

  function toggleCurrentMode() {
    bodyRef.current?.classList.toggle("dark");
  }
  if (!studentId) {
    return <BasicModal />;
  }
  const userFavoritesFiles = studentDetails?.favorites;

  return (
    <>
      {!studentDetails && (
        <Modal open className="flex items-center justify-center">
          <CircularColor color="info" size={50} />
        </Modal>
      )}

      {studentDetails && studentDetails?.status !== 404 && (
        <div ref={bodyRef} className="classbody dark h-screen">
          <SideBar
            toggleModal={() => setShowModal(false)}
            picture={studentDetails?.picture}
          />

          <section id="content" className="h-[100vh]  ">
            <Navigation units={units} toggleMode={toggleCurrentMode} />

            <main className="h-full">
              <HeadTitle
                coursecode={
                  studentDetails
                    ? studentDetails.InstitutionGroup?.InstitutionCourse
                        .coursecode
                    : ""
                }
                yeargroup={
                  studentDetails
                    ? studentDetails.InstitutionGroup?.yeargroup
                    : ""
                }
                institutionName={
                  studentDetails?.InstitutionGroup?.InstitutionCourse
                    ?.Institution.institutionName
                }
                name={studentDetails ? studentDetails.firstname : ""}
              />

              <div className="table-data h-full ">
                {sideBarNav === SideBarEn.pdfChat && (
                  <PdfChat
                    name={studentDetails ? studentDetails.firstname : ""}
                  />
                )}

                {sideBarNav === SideBarEn.communities && (
                  <div className="w-full">
                    <ImageList studentId={studentId} />
                  </div>
                )}

                {sideBarNav === SideBarEn.dashboard && (
                  <>
                    <UserDashboard
                      userFavoritesFiles={userFavoritesFiles}
                      availableStorage={availableStorage}
                      freePlanAllocation={freePlanAllocation}
                      studentFiles={studentDetails?.files}
                      storage={storage}
                      groupId={
                        studentDetails
                          ? studentDetails?.InstitutionGroup?.id
                          : ""
                      }
                      handleShowModal={(val: string) => {
                        uploaderHandler(val);
                        setShowModal(true);
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
                          studentDetails
                            ? studentDetails?.InstitutionGroup?.id
                            : ""
                        }
                        studentId={studentId}
                        units={units ?? <CircularColor />}
                      />
                    )}
                    {displayFull === false && indexFileNav !== undefined && (
                      <FilesDashboard
                        availableStorage={availableStorage}
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
      )}
    </>
  );
}

export default DashboardScreen;
