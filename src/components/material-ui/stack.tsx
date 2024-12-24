"use client";
import { useAppSelector } from "@/hooks";
import {
  navigateRegisterInstitution,
  openModal,
  setUniSelectionIndex,
} from "@/store/features/counterslice";
import { FormTypesNav } from "@/types/prismatypes";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useDispatch } from "react-redux";
import EmptySelection from "../empty-selection";
import CircularColor from "./circular-progress";
import BasicModal from "./modal";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

export interface BasicRef {
  campusId: string;
}

export interface BasicStackProps {
  campusName: string;
  bgColor?: string;
  key: string;
}

function BasicStack(
  {
    campuses,
    uniId,
    isLoading,
  }: {
    campuses: { id: string; campusname: string; institutionId: string }[];
    uniId?: string;
    isLoading: boolean;
  },
  ref: React.Ref<BasicRef>
) {
  const uniSelection = useAppSelector(
    (state) => state.counter.uniSelectionIndex
  );

  const router = useRouter();

  const dispatch = useDispatch();
  const [selectedKey, setSelectedKey] = React.useState("");

  function handleAddCampus() {
    dispatch(openModal(true));
    dispatch(navigateRegisterInstitution(FormTypesNav.course));
    router.push("/institution-register");
  }

  function handleClicked(key: string) {
    setSelectedKey(key);
    dispatch(setUniSelectionIndex({ index: uniSelection.index, id: key }));
  }

  React.useImperativeHandle(ref, () => ({
    campusId: selectedKey,
  }));

  let content;

  if (isLoading) {
    content = <CircularColor />;
  }

  if (campuses.length === 0) {
    // dispatch(setNoNextAllow(true));
    content = (
      <EmptySelection
        name="campus"
        onPress={() => {
          dispatch(openModal(true));
        }}
      >
        <BasicModal campus="Campus name" uniId={uniId} />
      </EmptySelection>
    );
  } else {
    content = (
      <div className={"w-full"}>
        <ul className="flex flex-col gap-1">
          {campuses.map((campus) => (
            <li
              className={`${selectedKey === campus.id ? "bg-green-400" : "bg-green-300"} hover:scale-105 transition-all cursor-pointer text-center py-3`}
              key={campus.id}
              onClick={() => {
                handleClicked(campus.id);
              }}
            >
              <div className="text-white font-bold text-2xl " key={campus.id}>
                {campus.campusname}
              </div>
            </li>
          ))}

          <BasicModal campus="Campus name" uniId={uniId} />
          <div className="mt-8" onClick={handleAddCampus}>
            <li className="bg-blue-400 hover:scale-105 transition-all cursor-pointer rounded-full text-center py-3">
              <div className="font-bold text-2xl text-white">Add Campus?</div>
            </li>
          </div>
        </ul>
      </div>
    );

    // <Box sx={{ width: "100%" }}>
    // <Stack spacing={2}>
    //   {campuses.map((campus) => (
    //     <Item
    //       className={`${selectedKey === campus.id ? "bg-green-400" : "bg-green-300"} hover:scale-105 transition-all cursor-pointer`}
    //       key={campus.id}
    //       onClick={() => {
    //         handleClicked(campus.id);
    //       }}
    //     >
    //       <div className="text-white font-bold text-2xl " key={campus.id}>
    //         {campus.campusname}
    //       </div>
    //     </Item>
    //   ))}

    //   <BasicModal campus="Campus name" uniId={uniId} />
    //   <div className="mt-8" onClick={handleAddCampus}>
    //     <Item className="bg-blue-400 hover:scale-105 transition-all cursor-pointer rounded-full ">
    //       <div className="font-bold text-2xl text-white">Add Campus?</div>
    //     </Item>
    //   </div>
    // </Stack>
    // </Box>
  }
  // dispatch(setNoNextAllow(false));
  return content;
}

export default React.forwardRef(BasicStack);
