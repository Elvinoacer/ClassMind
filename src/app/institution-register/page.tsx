"use client";
import FormCourseComponent from "@/components/form-course";
import FormGroup from "@/components/form-group";
import FormComponent from "@/components/form-institution";
import FormUnit from "@/components/form-units";
import { useAppSelector } from "@/hooks";
import { FormTypesNav } from "@/types/prismatypes";
import React from "react";

function RegisterUni() {
  const formNavigation = useAppSelector(
    (state) => state.counter.navFormRegister
  );
  return (
    <>
      {formNavigation === FormTypesNav.institution && <FormComponent />}
      {formNavigation === FormTypesNav.course && <FormCourseComponent />}
      {formNavigation === FormTypesNav.group && <FormGroup />}
      {formNavigation === FormTypesNav.unit && <FormUnit />}
    </>
  );
}

export default RegisterUni;
