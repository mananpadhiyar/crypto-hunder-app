import React, { useContext, useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import axios from "axios";
import { TredingCoins } from "../../config/Api";
import { crypto } from "../../App";
import { Link } from "react-router-dom";
import { numberWithCommas } from "../CoinTable";

const Carousel = () => {
  let { currency, setCurrency, symbol } = useContext(crypto);

  const [trending, setTreding] = useState([]);

  const fetchTrendingData = async () => {
    let { data } = await axios.get(TredingCoins(currency));
    setTreding(data);
    // console.log(data);
  };

  useEffect(() => {
    fetchTrendingData();
  }, [currency]);

  const items = trending.map((coin) => {
    const profit = coin.price_change_percentage_24h >= 0;
    return (
      <>
        <Link className="caroselItem" to={`/coin/${coin.id}`}>
          <img height={80} src={coin.image} alt="" />
          <span>
            {coin.symbol}
            &nbsp;
            <span style={{ color: profit ? "rgb(14, 203, 129)" : "red" }}>
              {profit && "+"}
              {coin.price_change_percentage_24h}
            </span>
          </span>
          <div style={{ fontWeight: 500, fontSize: 22 }}>
            {symbol} {numberWithCommas(coin.current_price)}
          </div>
        </Link>
      </>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <div
      style={{
        height: "60%",
        display: "flex",
        alignItems: "center",
        marginTop: "60px",
      }}
    >
      <AliceCarousel
        mouseTracking
        infinite
        animationDuration={1500}
        autoPlay={1000}
        disableDotsControls
        items={items}
        responsive={responsive}
        disableButtonsControls
      ></AliceCarousel>
    </div>
  );
};

export default Carousel;
