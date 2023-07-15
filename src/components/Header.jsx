import React, { useContext } from "react";
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Select,
  MenuItem,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { crypto } from "../App";
import AuthModal from "./Authentication/AuthModal";
import UserSidebar from "./Authentication/UserSidebar";
import { useNavigate } from "react-router-dom";

const Header = () => {
  let navigate = useNavigate();
  let { currency, setCurrency, user } = useContext(crypto);
  const theme = createTheme({
    palette: {
      mode: "dark",
      text: {
        primary: "#fff",
      },
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <AppBar color="transparent" position="static">
          <Container>
            <Toolbar>
              <Typography
                onClick={() => navigate("/")}
                sx={{
                  fontSize: {
                    xl: "24px",
                    lg: "23px",
                    md: "22px",
                    sm: "20px",
                    xs: "19px",
                  },
                  color: "gold",
                  fontWeight: "bold",
                  flex: 1,
                  cursor: "pointer",
                }}
              >
                Crypto Hunter
              </Typography>
              <Select
                style={{ width: 100, height: 42, marginRight: 15 }}
                inputProps={{ "aria-label": "Without label" }}
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <MenuItem value={"INR"}>INR</MenuItem>
                <MenuItem value={"USD"}>USD</MenuItem>
              </Select>

              {user ? <UserSidebar></UserSidebar> : <AuthModal />}
            </Toolbar>
          </Container>
        </AppBar>
      </ThemeProvider>
    </>
  );
};

export default Header;
