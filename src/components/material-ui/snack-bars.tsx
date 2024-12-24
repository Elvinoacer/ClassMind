"use client";
import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";

export interface PositionedSnackbarProps {
  handleOpen: (newState: SnackbarOrigin) => void;
  handleClose: () => void;
}

interface State extends SnackbarOrigin {
  open: boolean;
}

function PositionedSnackbar(props, ref: React.Ref<PositionedSnackbarProps>) {
  const [state, setState] = React.useState<State>({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  const handleOpen = (newState: SnackbarOrigin) => () => {
    console.log("IS OPEN BRO");
    setState({
      ...newState,
      open: true,
    });
  };

  const handleClose = () => {
    setTimeout(() => {
      setState({ ...state, open: false });
    }, 5000);
  };

  React.useImperativeHandle(ref, () => ({
    handleClose,
    handleOpen,
  }));

  const buttons = (
    <React.Fragment>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={handleOpen({ vertical: "top", horizontal: "center" })}>
          Top-Center
        </Button>
      </Box>
      <Grid container sx={{ justifyContent: "center" }}>
        <Grid item xs={6}>
          <Button onClick={handleOpen({ vertical: "top", horizontal: "left" })}>
            Top-Left
          </Button>
        </Grid>
        <Grid item xs={6} sx={{ textAlign: "right" }}>
          <Button
            onClick={handleOpen({ vertical: "top", horizontal: "right" })}
          >
            Top-Right
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            onClick={handleOpen({ vertical: "bottom", horizontal: "left" })}
          >
            Bottom-Left
          </Button>
        </Grid>
        <Grid item xs={6} sx={{ textAlign: "right" }}>
          <Button
            onClick={handleOpen({ vertical: "bottom", horizontal: "right" })}
          >
            Bottom-Right
          </Button>
        </Grid>
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          onClick={handleOpen({ vertical: "bottom", horizontal: "center" })}
        >
          Bottom-Center
        </Button>
      </Box>
    </React.Fragment>
  );

  return (
    <Box>
      {/* {buttons} */}
      <button
        onClick={() => handleOpen({ vertical: "top", horizontal: "center" })}
      >
        OPen
      </button>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message="I love snacks"
        key={vertical + horizontal}
      />
    </Box>
  );
}

export default React.forwardRef(PositionedSnackbar);
