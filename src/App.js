import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import CoinPage from "./pages/CoinPage";
import { createContext, useEffect, useState } from "react";

import axios from "axios";
import { CoinList } from "./config/Api";
import Alert from "./components/Alert";
import { onAuthStateChanged } from "firebase/auth";
import { Auth, db } from "./Firebase";
import { doc, onSnapshot } from "firebase/firestore";
const crypto = createContext();

function App() {
  let [currency, setCurrency] = useState("INR");
  let [symbol, setSymbol] = useState("₹");
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState(null);

  const [watchlist, setWatchList] = useState([]);

  useEffect(() => {
    if (user) {
      const coinRef = doc(db, "watchlist", user.uid);
      var unsubcribe = onSnapshot(coinRef, (coin) => {
        if (coin.exists()) {
          console.log(coin.data().coins);
          setWatchList(coin.data().coins);
        } else {
          console.log("No item in the watchList");
        }
      });
      return () => {
        unsubcribe();
      };
    }
  }, [user]);

  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    onAuthStateChanged(Auth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);

  const fetchCoinList = async () => {
    setLoading(true);
    let { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    if (currency === "INR") {
      setSymbol("₹");
    } else if (currency === "USD") {
      setSymbol("$");
    }
  }, [currency]);

  return (
    <crypto.Provider
      value={{
        currency,
        setCurrency,
        symbol,
        coins,
        loading,
        fetchCoinList,
        alert,
        setAlert,
        user,
        watchlist,
      }}
    >
      <div className="main">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/coin/:id" element={<CoinPage />}></Route>
        </Routes>
      </div>
      <Alert></Alert>
    </crypto.Provider>
  );
}

export default App;

export { crypto };
