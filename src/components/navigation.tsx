"use client";
import { useAppSelector } from "@/hooks";
import { setIndexFileNav, toggleMenu } from "@/store/features/counterslice";
import { SideBar as SideBarEn } from "@/types/prismatypes";
import { Autocomplete, TextField } from "@mui/material";
import React, { useRef, useState } from "react";
import { FiAlignJustify } from "react-icons/fi";
import { useDispatch } from "react-redux";

function Navigation({
  units = [],
  toggleMode,
}: {
  units: [];
  toggleMode: () => void;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const sideBarNav = useAppSelector((state) => state.counter.navSideBar);
  const indexFileNav = useAppSelector((state) => state.counter.indexFileNav);
  const toggledMenu = useAppSelector((state) => state.counter.toggleMenu);
  console.log(indexFileNav);
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();

  // const [searchUnits, setSearchUnits] = useState<
  //   { label: string; id: string; index: number }[]
  // >([]);

  // const [files, setFiles] = useState<
  //   { index: number; url: string; label: string; id: string }[]
  // >([]);

  function toggleSidebar() {
    dispatch(toggleMenu(!toggledMenu));
  }

  const searchUnits = units.map((unit, i) => ({
    label: unit.unitname,
    id: unit.id,
    index: i,
  }));

  const files = units[indexFileNav]?.files?.map((file, index) => ({
    url: file.url,
    id: file.id,
    index,
    label: file.filename,
  }));

  // console.log(units);
  // console.log(indexFileNav);

  // console.log(searchTerm);

  return (
    <nav>
      <i onClick={toggleSidebar} ref={ref} className="bx bx-menu">
        <FiAlignJustify size={30} className="text-blue-500" />
      </i>

      {sideBarNav === SideBarEn.classstore && (
        <form>
          <div className="">
            <Autocomplete
              disablePortal={true}
              className="border border-blue-500 rounded-xl overflow-hidden h-10 autocomplete"
              renderOption={(props, option) => (
                <li
                  {...props}
                  key={option.id}
                  onClick={(e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
                    props?.onClick(e);

                    if (indexFileNav === undefined) {
                      dispatch(setIndexFileNav(option.index));
                    }
                  }}
                >
                  {option.label}
                </li>
              )}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  {...params}
                  label={`Search ${indexFileNav === undefined ? "unit" : "file"}...`}
                  className="bg-blue-200 w-[300px] h-full"
                />
              )}
              options={indexFileNav === undefined ? searchUnits : files}
            />
          </div>
        </form>
      )}
      <div>
        <input type="checkbox" id="switch-mode" hidden />
        <label
          htmlFor="switch-mode"
          className="switch-mode"
          onClick={toggleMode}
        ></label>
      </div>
    </nav>
  );
}

export default Navigation;
