"use client";
// import { universities } from "@/app/universities";
import { useGetAllUniversitiesQuery } from "@/rtk";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import Card from "./card";
import ComboBox from "./material-ui/auto-complete";
import { FormTypesNav } from "@/types/prismatypes";
import { useDispatch } from "react-redux";
import { navigateRegisterInstitution } from "@/store/features/counterslice";

function Cards() {
  const [pickedValue, setPickedValue] = React.useState<string | number>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const dispatch = useDispatch();
  const router = useRouter();
  const ourUniversities = useGetAllUniversitiesQuery("universities", {
    refetchOnMountOrArgChange: true,
  });

  function handleAddUni() {
    dispatch(navigateRegisterInstitution(FormTypesNav.institution));
    router.push("/institution-register");
  }

  console.log(ourUniversities.data);
  const handleSearchValue = useCallback(function handleChangeText(
    value: string | number
  ) {
    setPickedValue(value);
  }, []);

  const universityNames = ourUniversities?.data?.map((uni) => ({
    label: uni.institutionName,
    value: uni.id,
  }));

  function returnCards() {
    if (!pickedValue) {
      return ourUniversities.data.map((uni) => (
        <Card
          key={uni.logo}
          logo={uni.logo}
          image={uni.image}
          name={uni.institutionName}
          institutionId={uni.id}
        />
      ));
    } else {
      return ourUniversities.data
        .filter((uni) => uni.id === pickedValue)
        .map((uni) => (
          <Card
            key={uni.logo}
            logo={uni.logo}
            image={uni.image}
            name={uni.institutionName}
            institutionId={uni.id}
          />
        ));
    }
  }

  return (
    <>
      <div className="cardscontainer">
        <h1 className="font-bold text-3xl mb-4 text-center">
          All institutions
        </h1>
        <div className="w-full flex items-center justify-center mb-9">
          <ComboBox
            handleSearchValue={handleSearchValue}
            options={universityNames}
            inputLabel="Institutions"
          />
          {/* <input
            placeholder="search..."
            type="text"
            value={searchTerm.toLowerCase()}
            onChange={handleChangeText}
            name="campus"
            className="px-10 py-2 placeholder:text-blue-500 rounded-full text-white bg-slate-500 border-none outline-none font-bold "
          /> */}
        </div>
        <div className="card__container">
          {ourUniversities.data &&
            // ourUniversities.data.map((uni) => (
            //   <Card
            //     key={uni.logo}
            //     logo={uni.logo}
            //     image={uni.image}
            //     name={uni.institutionName}
            //     institutionId={uni.id}
            //   />
            // ))
            returnCards()}
        </div>
        {ourUniversities.isSuccess && (
          <div className="addBox">
            <span className="addText"> Do not see your institution?</span>
            <button onClick={handleAddUni} className="addText addButton">
              Let&apos;s add
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Cards;
