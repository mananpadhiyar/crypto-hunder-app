import React, { useContext, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { AppBar, Tabs, Tab } from "@mui/material";
import Login from "./Login";
import Signup from "./Signup";
import GoogleButton from "react-google-button";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { crypto } from "../../App";
import { Auth } from "../../Firebase";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    xl: 400,
    lg: 370,
    md: 350,
    sm: 330,
    xs: 310,
  },
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
};

const AuthModal = () => {
  const [value, setValue] = useState(0);

  //   console.log(value);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let { setAlert } = useContext(crypto);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const googleAuthProvider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    signInWithPopup(Auth, googleAuthProvider).then((res) => {
      setAlert({
        open: true,
        message: `Sign Up Successful. Welcome ${res.user.email}`,
        type: "success",
      });

      return;
    });
  };
  return (
    <div>
      <Button
        variant="contained"
        style={{
          width: 85,
          height: 40,
          backgroundColor: "#EEBC1D",
          fontWeight: 600,
          fontSize: 16,
        }}
        onClick={handleOpen}
      >
        Login
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <div>
            <Box
              sx={style}
              position="static"
              style={{
                backgroundColor: "#14161a",
                color: "white",
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                style={{ borderRadius: 10 }}
              >
                <Tab label="Login" />
                <Tab label="Sign Up" />
              </Tabs>
              {value === 0 && <Login handleClose={handleClose}></Login>}
              {value === 1 && <Signup handleClose={handleClose}></Signup>}
              <Box
                sx={{
                  padding: "40px",
                  paddingTop: 0,
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "center",
                  gap: "20px",
                  fontSize: 20,
                }}
              >
                <span>OR</span>
                <GoogleButton
                  style={{ width: "100%", outline: "none" }}
                  onClick={signInWithGoogle}
                ></GoogleButton>
              </Box>
            </Box>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default AuthModal;
