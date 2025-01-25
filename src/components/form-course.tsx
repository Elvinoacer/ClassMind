"use client";
import { useAppSelector } from "@/hooks";
import { useAddCourseMutation } from "@/rtk";
import {
  addCourse,
  navigateRegisterInstitution,
} from "@/store/features/counterslice";
import { FormTypesNav } from "@/types/prismatypes";
import React, { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import SubmitButton from "./submit-button";

function FormCourseComponent() {
  const university = useAppSelector((state) => state.counter.institution);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    const trCcourse = {
      institutionId: university.id,
      coursecode: course.coursecode,
      coursename: course.coursename,
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
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
              <span className="text text-nowrap">
                course code{" "}
                <span className="text-sm">(eg, cs for computer science)</span>
              </span>
              <span className="line"></span>
            </div>
          </div>
        </div>

        <div className="row100"></div>
        <div className="row100">
          <div className="col"></div>
        </div>

        <div className="row100">
          <SubmitButton loading={loading} />
        </div>
      </div>
    </form>
  );
}

export default FormCourseComponent;
