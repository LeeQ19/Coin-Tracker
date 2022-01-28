import { useQuery } from "react-query";
import { Link } from "react-router-dom";

import { ICoin } from "./interface";
import { getCoins } from "../components/api";
import {
  Container,
  Header,
  Title,
  Loader,
  CoinList,
  Coin,
  Icon,
} from "../components/CustomElements";

function Coins() {
  const urlIcon = "https://cryptoicon-api.vercel.app/api/icon/";
  const { data: coins } = useQuery<ICoin[]>("coins", getCoins);

  return (
    <Container>
      <Header>
        <Title>Coin - Tracker</Title>
      </Header>
      {coins ? (
        <CoinList>
          {coins.map((coin) => (
            <Link to={`/${coin.id}`} state={coin}>
              <Coin key={coin.id}>
                <Icon src={urlIcon + coin.symbol.toLowerCase()} />
                {coin.name}
              </Coin>
            </Link>
          )
          )}
        </CoinList>
      ) : (
        <Loader />
      )}
    </Container>
  );
}

export default Coins;
