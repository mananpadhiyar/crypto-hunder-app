import React, { useContext, useState } from "react";
import { crypto } from "../App";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
const Alert = () => {
  let { alert, setAlert } = useContext(crypto);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert({ open: false });
  };

  return (
    <Snackbar open={alert.open} autoHideDuration={3000} onClose={handleClose}>
      <MuiAlert
        onClose={handleClose}
        elevation={10}
        variant="filled"
        severity={alert.type}
      >
        {alert.message}
      </MuiAlert>
    </Snackbar>
  );
};

export default Alert;
