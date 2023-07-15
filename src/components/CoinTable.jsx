import {
  Container,
  ThemeProvider,
  Typography,
  createTheme,
  TextField,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Pagination,
  LinearProgress,
} from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { crypto } from "../App";
import { CoinList } from "../config/Api";
import { useNavigate } from "react-router-dom";

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const CoinTable = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  let { currency, setCurrency, symbol, loading, coins, fetchCoinList } =
    useContext(crypto);

  useEffect(() => {
    fetchCoinList();
  }, [currency]);

  // console.log(coins);

  const theme = createTheme({
    palette: {
      mode: "dark",
      text: {
        primary: "#fff",
      },
    },
  });

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search) ||
        coin.name.toUpperCase().includes(search) ||
        coin.symbol.toUpperCase().includes(search)
    );
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container sx={{ textAlign: "center" }}>
          <Typography
            sx={{
              margin: "20px",
              fontSize: {
                xl: "38px",
                lg: "36px",
                md: "32px",
                sm: "27px",
                xs: "25px",
              },
            }}
          >
            Cryptocurrency Prices by Market Cap
          </Typography>
          <TextField
            id="outlined-basic"
            style={{ marginBottom: 20, width: "100%" }}
            label="Search for Crypto Currency.."
            variant="outlined"
            onChange={(e) => setSearch(e.target.value)}
          />

          <TableContainer component={Paper}>
            {loading ? (
              <LinearProgress
                color="inherit"
                style={{ backgroundColor: "gold" }}
              >
                {" "}
              </LinearProgress>
            ) : (
              <Table aria-label="simple table">
                <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                  <TableRow>
                    {["Coin", "Price", "24h Change", "Market Cap"].map(
                      (value) => (
                        <TableCell
                          style={{
                            color: "black",
                            fontWeight: "700",
                          }}
                          align={value === "Coin" ? "" : "right"}
                          key={value}
                        >
                          {value}
                        </TableCell>
                      )
                    )}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {handleSearch()
                    .slice((page - 1) * 10, (page - 1) * 10 + 10)
                    .map((coin) => {
                      const profit = coin.price_change_percentage_24h > 0;
                      return (
                        <>
                          <TableRow
                            onClick={() => navigate(`/coin/${coin.id}`)}
                            className="row-item"
                          >
                            <TableCell
                              style={{
                                display: "flex",
                                gap: 15,
                              }}
                            >
                              <img
                                src={coin.image}
                                alt={coin.name}
                                height={50}
                                style={{ marginBottom: 10 }}
                              ></img>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                <span
                                  style={{
                                    textTransform: "uppercase",
                                    fontSize: 22,
                                    color: "white",
                                  }}
                                >
                                  {coin.symbol}
                                </span>
                                <span style={{ color: "darkgrey" }}>
                                  {coin.name}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell
                              align="right"
                              style={{
                                fontWeight: 500,
                              }}
                            >
                              {symbol}{" "}
                              {numberWithCommas(coin.current_price.toFixed(2))}
                            </TableCell>
                            <TableCell
                              align="right"
                              style={{
                                color: profit ? "rgb(14, 203, 129)" : "red",
                              }}
                            >
                              {coin.market_cap_change_percentage_24h.toFixed(2)}
                              %
                            </TableCell>
                            <TableCell align="right">
                              {symbol}{" "}
                              {numberWithCommas(
                                coin.market_cap.toString().slice(0, -6)
                              )}
                              M
                            </TableCell>
                          </TableRow>
                        </>
                      );
                    })}
                </TableBody>
              </Table>
            )}

            <Pagination
              sx={{
                "& .MuiPaginationItem-root": {
                  color: "gold",
                },
              }}
              style={{
                display: "flex",
                justifyContent: "center",
                backgroundColor: "#14161a",
                padding: 20,
              }}
              onChange={(_, index) => {
                setPage(index);
                window.scroll(0, 450);
              }}
              count={(handleSearch()?.length / 10).toFixed(0)}
            />
          </TableContainer>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default CoinTable;
