"use client";
import { useAppSelector } from "@/hooks";
import { setIndexFileNav, toggleMenu } from "@/store/features/counterslice";
import { SideBar as SideBarEn } from "@/types/prismatypes";
import { Autocomplete, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { FiAlignJustify } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { RxCross1 } from "react-icons/rx";

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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    label: unit.unitname,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    id: unit.id,
    index: i,
  }));
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const files = units[indexFileNav]?.files?.map((file, index) => ({
    url: file.url,
    id: file.id,
    index,
    label: file.filename,
  }));
  useEffect(() => {
    const handleResize = () => {
      const isMobileDevice = window.innerWidth <= 768; // Adjust breakpoint as needed
      dispatch(toggleMenu(isMobileDevice));
    };

    // Initial check on mount
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch]);

  return (
    <nav>
      <i onClick={toggleSidebar} ref={ref} className="bx bx-menu">
        {toggledMenu && <FiAlignJustify size={30} className="text-blue-500" />}
        {!toggledMenu && <RxCross1 className="text-blue-500" size={30} />}
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
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  //@ts-ignore
                  key={option.id}
                  onClick={(e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-ignore
                    props?.onClick(e);

                    if (indexFileNav === undefined) {
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      //@ts-ignore
                      dispatch(setIndexFileNav(option.index));
                    }
                  }}
                >
                  {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-ignore
                    option.label
                  }
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
