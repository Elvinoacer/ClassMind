import React from "react";
import { authorizeUser } from "../_actions/handleSubmitForm";
import Redirect from "../redirect/page";
import { redirect } from "next/navigation";

async function DashRedirect() {
  const { isAuth } = await authorizeUser();
  if (!isAuth) {
    redirect("/login");
  }
  return <Redirect />;
}

export default DashRedirect;
