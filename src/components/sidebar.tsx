"use client";

import { navigateSideBar } from "@/store/features/counterslice";
import { SideBar as SideBarEn } from "@/types/prismatypes";
import { useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";

import { useAppSelector } from "@/hooks";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Image from "next/image";
import { RiCommunityFill, RiRobot2Fill } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { SiGoogleclassroom } from "react-icons/si";
import { useDispatch } from "react-redux";

function SideBar({
  toggleModal,
  picture,
}: {
  picture: string;
  toggleModal?: () => void;
}) {
  const dispatch = useDispatch();
  const sideBarNav = useAppSelector((state) => state.counter.navSideBar);
  const toggleMenu = useAppSelector((state) => state.counter.toggleMenu);
  const activeClassList = {
    dashboard: false,
    myStore: false,
    classStore: false,
    pdfchat: false,
    communities: false,
  };
  const [active, setActive] = useState<typeof activeClassList>(activeClassList);

  function handleACtiveClass(name: string) {
    setActive((prev) => ({
      ...prev,
      ...activeClassList,
      [name]: true,
    }));
  }

  return (
    <section id="sidebar" className={`${toggleMenu ? "hide" : ""}`}>
      {/* // <!-- SIDEBAR --> */}
      <span className="profile">
        {picture && (
          <Image
            className=""
            width={40}
            height={40}
            src={picture}
            alt="people"
          />
        )}
      </span>
      <a href="#" className="brand">
        <i className="bx bxs-smile"></i>

        <span className="text">ClassMind</span>
      </a>
      <ul className="side-menu top">
        <li
          className={`${
            active.dashboard || SideBarEn.dashboard === sideBarNav
              ? "active"
              : ""
          }`}
          onClick={() => {
            handleACtiveClass("dashboard");
            dispatch(navigateSideBar(SideBarEn.dashboard));
          }}
        >
          <a
            href="#"
            onClick={() => {
              if (toggleModal) {
                toggleModal();
              }
            }}
          >
            <i className="bx bxs-dashboard">
              <RxDashboard />
            </i>

            <span className="text">Dashboard</span>
          </a>
        </li>

        <li
          className={`${active.classStore ? "active" : ""}`}
          onClick={() => {
            handleACtiveClass("classStore");
            if (toggleModal) {
              toggleModal();
            }
            dispatch(navigateSideBar(SideBarEn.classstore));
          }}
        >
          <a href="#">
            <i className="bx bxs-doughnut-chart">
              <SiGoogleclassroom />
            </i>
            <span className="text">Class Store</span>
          </a>
        </li>
        <li
          className={`${active.pdfchat ? "active" : ""}`}
          onClick={() => {
            handleACtiveClass("pdfchat");
            if (toggleModal) {
              toggleModal();
            }
            dispatch(navigateSideBar(SideBarEn.pdfChat));
          }}
        >
          <a href="#">
            <i className="bx bxs-message-dots">
              <RiRobot2Fill />
            </i>
            <span className="text">Doc Chat</span>
          </a>
        </li>

        <li
          className={`${active.communities ? "active" : ""}`}
          onClick={() => {
            handleACtiveClass("communities");
            if (toggleModal) {
              toggleModal();
            }
            dispatch(navigateSideBar(SideBarEn.communities));
          }}
        >
          <a href="#">
            <i className="bx bxs-group">
              <RiCommunityFill />
            </i>
            <span className="text">Communities</span>
          </a>
        </li>
      </ul>
      <ul className="side-menu">
        {/* <li>
          <a href="#">
            <i className="bx bxs-cog"></i>
            <span className="text">Settings</span>
          </a>
        </li> */}
        <li
          onClick={() => {
            if (toggleModal) {
              toggleModal();
            }
          }}
        >
          <LogoutLink postLogoutRedirectURL="/login" className="logout">
            {/* <a href="#" > */}
            <i className="bx bxs-log-out-circle">
              <AiOutlineLogout />
            </i>
            <span className="text">Logout</span>
            {/* </a> */}
          </LogoutLink>
        </li>
      </ul>
    </section>
  );
}

export default SideBar;
