import { Container, Typography } from "@mui/material";
import React, { useContext } from "react";
import Carousel from "./Carousel";
import { Crypto } from "../../App";

const Banner = () => {
  return (
    <div className="banner">
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        <div className="banner__content">
          <Typography
            sx={{
              fontWeight: "bold",
              marginBottom: "15px",
              fontSize: {
                xl: "56px",
                lg: "52px",
                md: "48px",
                sm: "43px",
                xs: "40px",
              },
            }}
          >
            Crypto Hunter
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{ color: "darkgrey", textTransform: "capitalize" }}
          >
            Get All The Info Regarding Your Favorite Crypto currency
          </Typography>
          <Carousel />
        </div>
      </Container>
    </div>
  );
};

export default Banner;
