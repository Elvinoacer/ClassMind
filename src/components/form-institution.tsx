"use client";
import { useAddUniversityMutation, useAddFileMutation } from "@/rtk";

import {
  addInstitution,
  navigateRegisterInstitution,
} from "@/store/features/counterslice";
import { FormTypesNav, InstitutionType } from "@/types/prismatypes";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import InputForFile from "./inputForFile";
import InputForFileImage from "./InputForFileImage";
import SubmitButton from "./submit-button";

const institution1 = {
  logo: "",
  image: "",
};

function FormComponent() {
  const dispatch = useDispatch();
  const [addUniversity] = useAddUniversityMutation();
  const [addAwsFile] = useAddFileMutation();

  const [submitting, setSubmitting] = useState<boolean>(false);

  const [pickedFiles, setPickedFiles] = useState<{ image: File; logo: File }>(
    {}
  );

  const [institution, setInstitution] = useState<InstitutionType>({
    image: "",
    institutionName: "",
    logo: "",
    campus: "",
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // setSubmitting(true);
    console.log(pickedFiles);

    if (!pickedFiles.logo || !pickedFiles.image) {
      return alert("Please select the required files");
    }
    // Add logo and image to aws first
    const formData = new FormData();

    formData.append("logo", pickedFiles.logo);
    formData.append("image", pickedFiles.image);

    const { data } = await addAwsFile(formData);

    console.log(data);

    const { data: DBData } = await addUniversity({
      image: data.imageUrl,
      institutionName: institution.institutionName,
      logo: data.logoUrl,
      campus: institution.campus,
    });
    console.log("HURRAY DB DATA NOW AVAILABLE", DBData);
    dispatch(addInstitution(data));
    dispatch(navigateRegisterInstitution(FormTypesNav.course));
    setSubmitting(false);
  }
  function handleTextChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setInstitution((prev) => ({
      ...prev,
      [e.target.name]: value,
    }));
  }

  function handleFileChange(
    typeImage: "logo" | "image",
    e: ChangeEvent<HTMLInputElement>
  ) {
    const files = e.target.files;
    if (!files) return console.log("No file was picked");
    setPickedFiles((prev) => ({ ...prev, [typeImage]: files[0] }));
    setInstitution((prev) => ({
      ...prev,
      [typeImage]: URL.createObjectURL(files[0]),
    }));

    institution1[typeImage] = URL.createObjectURL(files[0]);
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
        <h2>Add your institution</h2>
        <div className="row100">
          <div className="col">
            <div className="inputBox">
              <input
                type="text"
                name="institutionName"
                required
                value={institution.institutionName}
                onChange={handleTextChange}
              />
              <span className="text">Institution Name</span>
              <span className="line"></span>
            </div>
          </div>
          <div className="col">
            <div className="inputBox">
              <input
                type="text"
                name="campus"
                required
                value={institution.campus}
                onChange={handleTextChange}
              />
              <span className="text">Campus,(eg-main)</span>
              <span className="line"></span>
            </div>
          </div>
        </div>

        <div className="row100"></div>
        <div className="row100">
          <div className="col">
            <div className="file-uploadBox">
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
            </div>
            <div className="file-uploadBox">
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

export default FormComponent;
