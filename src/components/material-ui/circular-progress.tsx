import * as React from "react";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

type Color =
  | "secondary"
  | "primary"
  | "error"
  | "info"
  | "success"
  | "warning"
  | "inherit";
export default function CircularColor({
  size,
  color,
}: {
  size?: number;
  color?: Color;
}) {
  return (
    <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
      <CircularProgress
        className="border-none"
        color={color ?? "secondary"}
        size={size}
      />
      {/* <CircularProgress color="success" /> */}
      {/* <CircularProgress color="inherit" size={size} /> */}
    </Stack>
  );
}
