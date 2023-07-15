import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { HistoricalChart } from "../config/Api";
import { crypto } from "../App";
import { CircularProgress, ThemeProvider, createTheme } from "@mui/material";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { numberWithCommas } from "./CoinTable";
import { chartDays } from "../config/Data";
import SelectButton from "./SelectButton";

const CoinInfo = ({ coin }) => {
  let { currency } = useContext(crypto);

  const [historicData, setHistoricData] = useState();

  const [days, setDays] = useState();

  const [selected, setSelected] = useState(365);

  const fetchHistoricData = async () => {
    let { data } = await axios.get(HistoricalChart(coin.id, days, currency));

    setHistoricData(data.prices);
  };

  useEffect(() => {
    fetchHistoricData();
  }, [currency, days]);

  //   console.log(historicData);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  let data = historicData?.map((price) => {
    const [timStamp, p] = price;
    // console.log("time", timStamp, "price", p);

    const date = new Date(timStamp).toLocaleDateString("en-in");
    // let DATE = new Date(coin[0]);

    // let time =
    //   DATE.getHours() > 12
    //     ? `${DATE.getHours() - 12}:${DATE.getMinutes()} PM`
    //     : `${DATE.getHours()}:${DATE.getMinutes()} AM`;
    //  days === 1 ? time :

    return {
      Date: date,
      price: Number(p).toFixed(2),
    };
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="coinInfo-container">
        {!historicData ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          ></CircularProgress>
        ) : (
          <>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Date" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke="#8884d8"
                  fill="#8884d8"
                />
              </AreaChart>
            </ResponsiveContainer>
          </>
        )}

        <div
          style={{
            display: "flex",
            marginTop: 20,
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          {chartDays.map((day) => {
            return (
              <button
                style={{
                  color: selected === day.value ? "black" : "white",
                  backgroundColor: selected === day.value ? "gold" : "",
                  fontWeight: selected === day.value ? "700" : "500",
                  cursor: "pointer",
                }}
                className="chartBtn"
                onClick={() => {
                  setDays(day.value);
                  setSelected(day.value);
                }}
              >
                {day.label}
              </button>
            );
          })}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default CoinInfo;
