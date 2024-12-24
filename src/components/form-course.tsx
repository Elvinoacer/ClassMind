"use client";
import { useAddCourseMutation } from "@/rtk";
import {
  addCourse,
  navigateRegisterInstitution,
} from "@/store/features/counterslice";
import { FormTypesNav, InstitutionCourse } from "@/types/prismatypes";
import React, { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import SubmitButton from "./submit-button";
import { useAppSelector } from "@/hooks";

function FormCourseComponent() {
  const university = useAppSelector((state) => state.counter.institution);

  console.log(university);

  const dispatch = useDispatch();
  const [addCourseData] = useAddCourseMutation();

  const [course, setCourse] = useState<{
    coursecode: string;
    coursename: string;
  }>({
    coursecode: "",
    coursename: "",
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const trCcourse: InstitutionCourse = {
      institutionId: university.id,
      coursecode: course.coursecode,
      coursename: course.coursename,
    };
    const { data } = await addCourseData(trCcourse);
    dispatch(addCourse(data));

    dispatch(navigateRegisterInstitution(FormTypesNav.group));
  }
  function handleTextChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setCourse((prev) => ({
      ...prev,
      [e.target.name]: value,
    }));
  }

  return (
    <form
      className="formBody"
      // action={async (formData) => {
      //   await handleSubmitFormAction(formData);
      // }}

      onSubmit={handleSubmit}
    >
      <div className="formCardsContainer">
        <h2>Add your Course</h2>
        <div className="row100">
          <div className="col">
            <div className="inputBox">
              <input
                type="text"
                name="coursename"
                required
                value={course.coursename}
                onChange={handleTextChange}
              />
              <span className="text">Your course name</span>
              <span className="line"></span>
            </div>
          </div>
          <div className="col">
            <div className="inputBox">
              <input
                type="text"
                name="coursecode"
                required
                maxLength={4}
                value={course.coursecode}
                onChange={handleTextChange}
              />
              <span className="text">
                course code (eg, cs for computer science)
              </span>
              <span className="line"></span>
            </div>
          </div>
        </div>
        {/* <div className="row100">
          <div className="col">
            <div className="inputBox">
              <input
                type="text"
                name="course"
                required
                value={institution.course}
                onChange={handleTextChange}
              />
              <span className="text">Your Course</span>
              <span className="line"></span>
            </div>
          </div>
          <div className="col">
            <div className="inputBox">
              <input
                type="text"
                name="yearOfEntry"
                required
                value={institution.yearOfEntry}
                onChange={handleTextChange}
              />
              <span className="text">Year of entry</span>
              <span className="line"></span>
            </div>
          </div>
        </div> */}
        <div className="row100">
          {/* <div className="col">
            <div className="inputBox textarea">
              <textarea required></textarea>
              <span className="text">Type your message here</span>
              <span className="line"></span>
            </div>
          </div> */}
        </div>
        <div className="row100">
          <div className="col">
            {/* <div className="inputBox textarea">
              <textarea required></textarea>
              <span className="text">Type your message here</span>
              <span className="line"></span>
            </div> */}
            {/* <div className="file-uploadBox">
              {!institution.image && (
                <InputForFileImage
                  name="image"
                  key={1}
                  onChange={(e) => handleFileChange("image", e)}
                  label="Upload Image of your institution"
                />
              )}
              {institution.image && <div className="text-[#45f3ff]">Great</div>}
              <InputForFile
                name="logo"
                className="ml-72"
                key={2}
                onChange={(e) => handleFileChange("logo", e)}
                label="Upload Logo of your institution"
              />
            </div> */}
            {/* <div className="file-uploadBox">
              <div className="imageContainer-upload">
                {institution.image && (
                  <Image
                    src={institution.image}
                    alt="university Image"
                    height={200}
                    width={200}
                  />
                )}
                {!institution.image && (
                  <div className="text-white">No Image picked yet</div>
                )}
              </div>
              <div className="imageContainer-upload">
                {institution.logo && (
                  <Image
                    src={institution.logo}
                    alt="university logo"
                    height={200}
                    width={200}
                  />
                )}
                {!institution.logo && (
                  <div className="text-white">No Logo picked yet</div>
                )}
              </div>
            </div> */}
          </div>
        </div>

        <div className="row100">
          <SubmitButton />
        </div>
        {/* {data.universities.map((uni) => (
          <li key={uni.institutionName}>{uni.institutionName}</li>
        ))} */}
      </div>
    </form>
  );
}

export default FormCourseComponent;
