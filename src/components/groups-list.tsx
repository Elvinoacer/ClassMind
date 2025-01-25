"use client";
import React, { useState } from "react";
import EmptySelection from "./empty-selection";

import {
  addGroup,
  addGroupId,
  navigateRegisterInstitution,
} from "@/store/features/counterslice";
import { FormTypesNav } from "@/types/prismatypes";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

// interface GroupListRef {
//   groupId: string;
// }
interface GroupListProps {
  groups:
    | {
        id: string;
        institutionCourseId: string;
        students: [];
        units: [];
        yeargroup: string;
      }[]
    | [];
}

function GroupList({ groups }: GroupListProps) {
  const dispatch = useDispatch();
  const navigation = useRouter();
  // const uniSelection = useAppSelector(
  //   (state) => state.counter.uniSelectionIndex
  // );
  const [clickedKey, setClicked] = useState<string>("");
  // dispatch(setUniSelectionIndex({ index: uniSelection.index + 1, id: "" }));

  async function handleAddGroup() {
    dispatch(navigateRegisterInstitution(FormTypesNav.group));
    navigation.push("/institution-register");
  }

  function handleClicked(key: string) {
    setClicked(key);
    localStorage.setItem("groupId", key);
    dispatch(addGroupId(key));
  }

  // useImperativeHandle(ref, () => ({
  //   groupId:
  // }));

  let content: React.ReactNode;

  if (groups.length === 0) {
    // dispatch(setNoNextAllow(true));
    content = <EmptySelection name="groups" onPress={handleAddGroup} />;
  } else {
    // dispatch(setNoNextAllow(false));
    content = (
      <div className="w-full flex flex-col items-center justify-center gap-4">
        {groups.map((grp) => (
          <div
            onClick={() => {
              handleClicked(grp.id);
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-ignore
              dispatch(addGroup({ yeargroup: grp.yeargroup, id: grp.id }));
            }}
            key={grp.id}
            className={`w-full ${clickedKey === grp.id ? "bg-green-300" : ""}  flex justify-center items-center hover:scale-[1.02] border-green-300 border-[0.5px]
      px-4 py-4 rounded-full hover:bg-green-300 cursor-pointer transition-all
      `}
          >
            <div className="font-bold">{grp.yeargroup}</div>
          </div>
        ))}
        <div className="mt-8 w-full" onClick={handleAddGroup}>
          <li className="bg-blue-400 hover:scale-105 transition-all cursor-pointer rounded-full text-center py-3">
            <div className="font-bold text-2xl text-white">Add Group?</div>
          </li>
        </div>
      </div>
    );
  }

  return content;
}

export default GroupList;
