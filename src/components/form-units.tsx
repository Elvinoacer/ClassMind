"use client";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import SubmitButton from "./submit-button";
import { useAddUnitsMutation, useConnectStudentMutation } from "@/rtk";
import { Unit } from "@/types/prismatypes";
import BasicModal from "./material-ui/modal";
import { useAppSelector } from "@/hooks";

let allUnits: { [x: string]: string } | undefined = {};

function FormUnit() {
  const router = useRouter();

  const [connectStudent] = useConnectStudentMutation();
  const dispatch = useDispatch();
  const [addUnitsData] = useAddUnitsMutation();

  const [openModal, setOpenModal] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  const group = useAppSelector((state) => state.counter.group);
  console.log(group.id);
  const inputs = [];
  const numberofUnits: number[] = [];

  const [units, setUnits] = useState("");

  function setAllUnits() {
    for (let i = 1; i < +units; i++) {
      return {
        [`unit${i}`]: "",
      };
    }
  }

  allUnits = setAllUnits();
  const [unit, setUnit] = useState(allUnits);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setSubmitting(true);

    if (!units) return;

    const groupId = group?.id;
    if (!groupId) return alert("group id not found, please use one group");

    const registeredUnits = Object.values(unit!);

    const trUnits: Unit[] = registeredUnits.map((unt) => ({
      institutionGroupId: groupId,
      unitname: unt,
    }));

    const { data: ourUnits } = await addUnitsData(trUnits);

    const studentStr = localStorage.getItem("newstudent");
    if (!studentStr) return alert("no student found");
    const student = JSON.parse(studentStr);
    const { data: groupf } = await connectStudent({ student, groupId });
    console.log(groupf);

    if (!groupf) return alert("group ERROR");

    router.push(`/dashboard/${student.id}`);
    setSubmitting(false);
  }
  function handleTextChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (+value > 100) return;
    setUnits(value);
  }

  function handleUnitChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUnit((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  for (let i = 1; i <= +units; i++) {
    inputs.push(
      <div className="col" key={i.toString()}>
        <div className="inputBox">
          <input
            type="text"
            name={`unit${i}`}
            required
            value={unit ? unit[`unit${i}`] : ""}
            onChange={handleUnitChange}
          />
          <span className="text">Unit {i}</span>
          <span className="line"></span>
        </div>
      </div>
    );
    numberofUnits.push(i);
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
        <h2>Add units</h2>
        <div className="row100">
          <div className="col">
            <div className="inputBox">
              <input
                type="number"
                name="units"
                required
                value={units}
                onChange={handleTextChange}
              />
              <span className="text">How many units taken?</span>
              <span className="line"></span>
            </div>
          </div>
        </div>
        <div className="row100">{inputs.length !== 0 && inputs}</div>

        <div className="row100">
          {/* <BasicModal
            unit={true}
            groupId={group.id}
            openModal={openModal}
            onClose={() => setOpenModal(false)}
          /> */}
          <SubmitButton loading={submitting} />
        </div>
      </div>
    </form>
  );
}

export default FormUnit;
