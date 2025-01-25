"use client";

import { useGetAllUniversitiesQuery } from "@/rtk";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import Card from "./card";
import ComboBox from "./material-ui/auto-complete";
import { FormTypesNav, InstitutionType } from "@/types/prismatypes";
import { useDispatch } from "react-redux";
import { navigateRegisterInstitution } from "@/store/features/counterslice";
import CircularColor from "./material-ui/circular-progress";

function Cards() {
  const [pickedValue, setPickedValue] = React.useState<string | number>("");
  const [loading, setLoading] = useState(false);
  // const [searchTerm, setSearchTerm] = useState<string>("");
  const dispatch = useDispatch();
  const router = useRouter();
  const ourUniversities = useGetAllUniversitiesQuery("universities", {
    refetchOnMountOrArgChange: true,
  });

  function handleAddUni() {
    setLoading(true);
    dispatch(navigateRegisterInstitution(FormTypesNav.institution));
    router.push("/institution-register");
  }

  const handleSearchValue = useCallback(function handleChangeText(
    value: string | number
  ) {
    setPickedValue(value);
  }, []);

  const universityNames = ourUniversities?.data?.map(
    (uni: InstitutionType) => ({
      label: uni.institutionName,
      value: uni.id,
    })
  );

  function returnCards() {
    if (!pickedValue) {
      return ourUniversities.data.map((uni: InstitutionType) => (
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
        .filter((uni: InstitutionType) => uni.id === pickedValue)
        .map((uni: InstitutionType) => (
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
        </div>
        <div className="card__container">
          {ourUniversities.data && returnCards()}
        </div>
        {ourUniversities.isSuccess && (
          <div className="addBox">
            <span className="addText"> Do not see your institution?</span>
            {loading ? (
              <CircularColor size={12} />
            ) : (
              <button
                onClick={handleAddUni}
                className="addText addButton md:py-7"
              >
                Let&apos;s add
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Cards;
