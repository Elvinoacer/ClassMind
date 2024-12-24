import { useAppSelector } from "@/hooks";
import { setIndexFileNav } from "@/store/features/counterslice";
import { SideBar as SideBarEn } from "@/types/prismatypes";
import { useRef } from "react";
import { useDispatch } from "react-redux";

function HeadTitle({
  name,
  institutionName,
  yeargroup,
  coursecode,
}: {
  name: string;
  institutionName: string | undefined;
  yeargroup?: string;
  coursecode?: string;
}) {
  const indexFileNav = useAppSelector((state) => state.counter.indexFileNav);
  const sideBarNav = useAppSelector((state) => state.counter.navSideBar);

  const dispatch = useDispatch();

  const listRef = useRef<HTMLUListElement | null>(null);

  return (
    <div className="head-title">
      <div className="left">
        <h1 className="welcome-title md:text-[12px]">Welcome, {name}</h1>
        <div className="font-bold mb-3 -mt-2">
          {institutionName}

          <a href="#" className="nav-link ml-5">
            {coursecode}-/{yeargroup}
          </a>
        </div>
        {sideBarNav === SideBarEn.classstore && (
          <ul
            className="breadcrumb"
            ref={listRef}
            onClick={(e) => {
              console.log(e.target);
            }}
          >
            <li
              onClick={() => dispatch(setIndexFileNav(undefined))}
              className="hover:cursor-pointer"
            >
              <a
                className={`${
                  indexFileNav === undefined && "active font-bold"
                } hover:cursor-pointer`}
                href="#"
              >
                Units
              </a>
            </li>
            <li>
              <i className="bx bx-chevron-right"></i>
            </li>
            <li className="hover:cursor-pointer">
              {
                <a
                  className={`${indexFileNav !== undefined && "active font-bold"}`}
                  href="#"
                >
                  Files
                </a>
              }
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}

export default HeadTitle;
