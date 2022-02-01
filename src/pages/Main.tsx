import { useQuery } from "react-query";
import { Link } from "react-router-dom";

import { ICoin } from "./interface";
import { getCoins } from "../components/api";
import {
  Container,
  Header,
  Title,
  ThemeBtn,
  Loader,
  CoinList,
  CoinBox,
  Icon,
  Footer,
} from "../components/CustomElements";

function Main() {
  const urlIcon = "https://cryptoicon-api.vercel.app/api/icon/";
  const { data: coins } = useQuery<ICoin[]>("coins", getCoins);

  return (
    <Container>
      <Header>
        <Title>Coin - Tracker</Title>
        <ThemeBtn />
      </Header>
      {coins ? (
        <CoinList>
          {coins.map(coin => (
            <Link to={`/${coin.id}/chart`} state={coin}>
              <CoinBox key={coin.id}>
                <Icon src={urlIcon + coin.symbol.toLowerCase()} />
                {coin.name}
              </CoinBox>
            </Link>
          ))}
        </CoinList>
      ) : (
        <Loader />
      )}
      <Footer />
    </Container>
  );
}

export default Main;
