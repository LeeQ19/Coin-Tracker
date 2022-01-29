import axios from "axios";

const urlCoinPprk = "https://api.coinpaprika.com/v1";

export function getCoins() {
  return (
    axios
      .get(`${urlCoinPprk}/coins`)
      .then((res) => res.data.slice(0, 100))
  );
}

export function getInfo(coinId: string) {
  return (
    axios
      .get(`${urlCoinPprk}/coins/${coinId}`)
      .then((res) => res.data)
  );
}

export function getPrice(coinId: string) {
  return (
    axios
      .get(`${urlCoinPprk}/tickers/${coinId}`)
      .then((res) => res.data)
  );
}

export function getOhlc(coinId: string, period: "day" | "week" | "month" | "year") {
  if (period === "day") {
    return (
      axios
        .get(`${urlCoinPprk}/coins/${coinId}/ohlcv/today`)
        .then((res) => res.data)
    );
  } else {
    const interval = (period === "week" ? 6 : (period === "month" ? 30 : 364));
    const endDate = Math.floor(Date.now() / 1000);
    const startDate = endDate - 60 * 60 * 24 * interval;
    return (
      axios
        .get(`${urlCoinPprk}/coins/${coinId}/ohlcv/historical`, {
          params: {
            start: startDate,
            end: endDate,
          }
        })
        .then((res) => res.data)
    );
  }
}