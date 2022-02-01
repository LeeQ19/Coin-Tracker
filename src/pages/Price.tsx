import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

import { IPrice } from "./interface";
import { getPrice } from "../components/api";
import { Loader, PriceWrapper, PriceBox } from "../components/CustomElements";



function Price() {
  const { coinId } = useParams();
  const { data: price } = useQuery<IPrice>(["price", coinId], () => getPrice(coinId!), { refetchInterval: 5000 });

  return (price ? (
    <PriceWrapper>
      <PriceBox>
        <span>
          Current Price
        </span>
        <span>
          $ {price.quotes.USD.price.toLocaleString("en", { maximumFractionDigits: 20 })}
        </span>
      </PriceBox>
      <PriceBox>
        <span>
          Circulating Supply
        </span>
        <span>
          {price.circulating_supply.toLocaleString("en")}
        </span>
      </PriceBox>
      <PriceBox>
        <span>
          Market Capitality
        </span>
        <span>
          $ {price.quotes.USD.market_cap.toLocaleString("en")} 
          ({price.quotes.USD.market_cap_change_24h > 0 ? " ▲ +" : " ▼ "}{price.quotes.USD.market_cap_change_24h} )
        </span>
      </PriceBox>
      <PriceBox>
        <span>
          Trading Volume (24h)
        </span>
        <span>
          {price.quotes.USD.volume_24h.toLocaleString("en")}
          ({price.quotes.USD.volume_24h_change_24h > 0 ? " ▲ +" : " ▼ "}{price.quotes.USD.volume_24h_change_24h} )
        </span>
      </PriceBox>
      <PriceBox>
        <span>
          All Time High
        </span>
        <span>
          {price.quotes.USD.ath_date.toString().slice(0, 10)}: 
          $ {price.quotes.USD.ath_price.toLocaleString("en", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
      </PriceBox>
    </PriceWrapper>
  ) : (
    <Loader />
  ));
}

export default Price;
