"use client";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import * as React from "react";

export default function SimpleBackdrop({
  openModal,
  children,
  handleClose,

  showSpinner = true,
}: {
  showSpinner?: boolean;
  handleClose?: () => void;
  children?: React.ReactNode;
  openModal?: boolean;
}) {
  return (
    <div className={`${!openModal ? "hidden" : ""}`}>
      <Backdrop
        className="pt-16 "
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={true}
        onClick={handleClose}
      >
        {showSpinner && <CircularProgress color="inherit" />}
        {children}
      </Backdrop>
    </div>
  );
}
