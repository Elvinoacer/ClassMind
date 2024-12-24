"use client";

import { useAppSelector } from "@/hooks";
import {
  addCourse,
  navigateRegisterInstitution,
  setUniSelectionIndex,
} from "@/store/features/counterslice";
import { FormTypesNav } from "@/types/prismatypes";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useDispatch } from "react-redux";
import EmptySelection from "../empty-selection";

export interface CourseListPropscourses {
  coursename: string;
  coursecode: string;
  id: string;
}

export default function CoursesList({
  courses,
}: {
  courses: CourseListPropscourses[];
}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [transition, setTransition] = React.useState(false);

  const [clickedKey, setClickedKey] = React.useState("");
  const uniSelection = useAppSelector(
    (state) => state.counter.uniSelectionIndex
  );
  function handleClicked(key: string) {
    setClickedKey(key);
    dispatch(setUniSelectionIndex({ index: uniSelection.index, id: key }));
  }

  function handleAddCourse() {
    setTransition(true);

    dispatch(navigateRegisterInstitution(FormTypesNav.course));
    router.push("/institution-register");
  }

  if (courses?.length === 0) {
    // dispatch(setNoNextAllow(true));
    return <EmptySelection onPress={handleAddCourse} name="course" />;
  }

  // dispatch(setNoNextAllow(false));

  return (
    <List
      sx={{ width: "100%", bgcolor: "transparent" }}
      className="flex flex-col justify-center items-center  "
    >
      {courses?.map((course) => (
        <div key={course.id} className="w-full">
          <ListItem
            className={`${clickedKey === course.id ? "bg-green-400" : "bg-green-300"} rounded-lg cursor-pointer hover:scale-[1.005] transition-all`}
            onClick={() => {
              handleClicked(course.id);
              dispatch(
                addCourse({
                  id: course.id,

                  coursecode: course.coursecode,
                  coursename: course.coursename,
                })
              );
            }}
          >
            <ListItemAvatar>
              {/* <Avatar>
            <div>Hello</div>
            <ImageIcon />
          </Avatar> */}
              <div
                className={`w-20 h-20 ${clickedKey === course.id ? "bg-green-300" : "bg-green-400"} rounded-full flex items-center justify-center mr-9`}
              >
                <div className="text-white font-bold">{course.coursecode}</div>
              </div>
            </ListItemAvatar>
            <div className="text-white font-bold ">{course.coursename}</div>
          </ListItem>

          {/* Divider */}
          <div className="w-full h-[0.5px] bg-gray-500 opacity-45 mt-3 mb-3"></div>
        </div>
      ))}
    </List>
  );
}
