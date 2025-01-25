"use client";
import Cards from "@/components/cards";
import React, { useEffect } from "react";
import { authorizeUser } from "../_actions/handleSubmitForm";

function Institution() {
  useEffect(() => {
    async function auth() {
      const { isAuth } = await authorizeUser();
      if (!isAuth) {
        window.location.assign("/login");
        return;
      }
    }
    auth();
  }, []);
  return (
    <>
      <Cards />
    </>
  );
}

export default Institution;
