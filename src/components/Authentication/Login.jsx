import { Box, Button, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { crypto } from "../../App";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Auth } from "../../Firebase";

const Login = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let { setAlert } = useContext(crypto);

  const handleSubmit = async () => {
    if (!email || !password) {
      setAlert({
        open: true,
        message: "Please Fill the all Fields",
        type: "error",
      });

      return;
    }

    try {
      const result = await signInWithEmailAndPassword(Auth, email, password);

      setAlert({
        open: true,
        message: `Log in Successful. Welcome ${result.user.email}`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  return (
    <Box
      p={3}
      style={{ display: "flex", flexDirection: "column", gap: "20px" }}
    >
      <TextField
        variant="outlined"
        type="email"
        label="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      ></TextField>
      <TextField
        variant="outlined"
        type="password"
        label="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      ></TextField>

      <Button
        variant="contained"
        size="large"
        style={{ backgroundColor: "#EEBC1D" }}
        onClick={handleSubmit}
      >
        Login
      </Button>
    </Box>
  );
};

export default Login;
