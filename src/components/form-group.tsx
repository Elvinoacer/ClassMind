"use client";
import { useAppSelector } from "@/hooks";
import { useAddYearGroupMutation } from "@/rtk";
import {
  addGroup,
  navigateRegisterInstitution,
} from "@/store/features/counterslice";
import { FormTypesNav } from "@/types/prismatypes";
import React, { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import SubmitButton from "./submit-button";

function FormGroup() {
  const [addGroupData] = useAddYearGroupMutation();
  const dispatch = useDispatch();
  const course = useAppSelector((state) => state.counter.course);
  const [submitting, setSubmitting] = useState(false);

  const [yeargroup, setYearGroup] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setSubmitting(true);

    const trGroup = {
      institutionCourseId: course.id,
      yeargroup,
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const { data } = await addGroupData(trGroup);

    dispatch(addGroup(data));
    dispatch(navigateRegisterInstitution(FormTypesNav.unit));

    setSubmitting(false);
  }
  function handleTextChange(e: ChangeEvent<HTMLInputElement>) {
    setYearGroup(e.target.value);
  }

  return (
    <form className="formBody w-full" onSubmit={handleSubmit}>
      <div className="formCardsContainer">
        <h2>Add your year of entry</h2>
        <div className="row100">
          <div className="col">
            <div className="inputBox">
              <input
                type="number"
                name="yeargroup"
                required
                value={yeargroup}
                onChange={handleTextChange}
              />
              <span className="text">Your year of entry</span>
              <span className="line"></span>
            </div>
          </div>
        </div>

        <div className="row100">
          <SubmitButton loading={submitting} />
        </div>
      </div>
    </form>
  );
}

export default FormGroup;
