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
      .get(`${urlCoinPprk}/ticker/${coinId}`)
      .then((res) => res.data)
  );
}

export function getHistory(coinId: string) {
  const endDate = Math.floor(Date.now() / 1000);
  const startDate = endDate - 60 * 60 * 24 * 6;
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