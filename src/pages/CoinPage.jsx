import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SingleCoin } from "../config/Api";
import axios from "axios";
import { crypto } from "../App";
import { Button, LinearProgress, Typography } from "@mui/material";
import ReactHtmlParser from "react-html-parser";
import { numberWithCommas } from "../components/CoinTable";
import CoinInfo from "../components/CoinInfo";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../Firebase";

const CoinPage = () => {
  let { id } = useParams();

  const [coin, setCoin] = useState();

  let { currency, symbol, user, watchlist, setAlert } = useContext(crypto);

  let fetchsingleCoin = async () => {
    let { data } = await axios.get(SingleCoin(id));

    setCoin(data);
  };

  useEffect(() => {
    fetchsingleCoin();
  }, []);

  // console.log(coin);

  const inWatchlist = watchlist.includes(coin?.id);

  const addToWatchlist = async () => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        { coins: watchlist ? [...watchlist, coin?.id] : [coin?.id] },
        { merge: true }
      );

      setAlert({
        open: true,
        message: `${coin.name} Added to the Watchlist !`,
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

  const removeFromWatchlist = async () => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        {
          coins: watchlist.filter((watch) => watch !== coin?.id),
        },
        { merge: true }
      );

      setAlert({
        open: true,
        message: `${coin.name} Removed to the Watchlist !`,
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

  if (!coin) {
    return (
      <LinearProgress style={{ backgroundColor: "gold" }}></LinearProgress>
    );
  }
  return (
    <div className="container">
      <div className="sideBar">
        <img
          height={200}
          style={{ marginBottom: 20 }}
          src={coin?.image.large}
          alt=""
        />
        <Typography variant="h3">{coin?.name}</Typography>
        <Typography
          style={{
            width: "100%",
            paddingTop: 14,
            paddingBottom: 20,
            textAlign: "justify",
          }}
          variant="subtitle1"
        >
          {ReactHtmlParser(coin?.description.en.split(".")[0])}.
        </Typography>
        <div className="marketData">
          <span style={{ display: "flex" }}>
            <Typography variant="h5" style={{ fontWeight: "bold" }}>
              Rank :
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5">{coin?.market_cap_rank}</Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography variant="h5" style={{ fontWeight: "bold" }}>
              Current Price :{" "}
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5">
              {symbol}{" "}
              {coin &&
                numberWithCommas(
                  coin?.market_data.current_price[currency.toLowerCase()]
                )}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography variant="h5" style={{ fontWeight: "bold" }}>
              Market Cap :
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5">
              {" "}
              {symbol}{" "}
              {coin &&
                numberWithCommas(
                  coin?.market_data.market_cap[currency.toLowerCase()]
                    .toString()
                    .slice(0, -6)
                )}
              M
            </Typography>
          </span>

          {user && (
            <Button
              variant="contained"
              style={{
                width: "100%",
                height: "40px",
                backgroundColor: inWatchlist ? "#ff0000" : "#EEBC1D",
                marginTop: 20,
                marginBottom: 20,
                textAlign: "center",
                color: inWatchlist ? "white" : "black",
              }}
              onClick={inWatchlist ? removeFromWatchlist : addToWatchlist}
            >
              {inWatchlist ? "Remove from Watchlist" : "Add To Watchlist"}
            </Button>
          )}
        </div>
      </div>

      {/* chart */}
      <CoinInfo coin={coin}></CoinInfo>
    </div>
  );
};

export default CoinPage;
