import React, { PropsWithChildren } from "react";
import Button from "@mui/material/Button";

function ButtonMui({ children }: PropsWithChildren) {
  return <Button variant="contained">{children}</Button>;
}

export default ButtonMui;
