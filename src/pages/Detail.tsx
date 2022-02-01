import { useQuery } from "react-query";
import { Routes, Route, useLocation, useParams, Link, useMatch } from "react-router-dom";

import { ILocation, IInfo, IPrice } from "./interface";
import { getInfo, getPrice } from "../components/api";
import Chart from "./Chart";
import Price from "./Price";
import {
  Container,
  Header,
  Title,
  SubTitle,
  BackBtn,
  ThemeBtn,
  Loader,
  Icon,
  Wrapper,
  OverviewBox,
  OverviewItem,
  Description,
  Tabs,
  Tab,
  Footer,
} from "../components/CustomElements";

function Detail() {
  const urlIcon = "https://cryptoicon-api.vercel.app/api/icon/";
  const { coinId } = useParams();
  const { state } = useLocation() as ILocation;
  const match = useMatch("/:coinId/:tab");
  const { data: info } = useQuery<IInfo>(["info", coinId], () => getInfo(coinId!));
  const { data: price } = useQuery<IPrice>(["price", coinId], () => getPrice(coinId!), { refetchInterval: 5000 });

  return (
    <Container>
      <Header>
        <BackBtn />
        <Title>Coin - Tracker</Title>
        {info ? (
          <SubTitle>
            <Icon src={urlIcon + info.symbol.toLowerCase()} />
            {info.name}
          </SubTitle>
        ) : state ? (
          <SubTitle>
            <Icon src={urlIcon + state.symbol.toLowerCase()} />
            {state.name}
          </SubTitle>
        ) : (
          <SubTitle>{coinId}</SubTitle>
        )}
        <ThemeBtn />
      </Header>
      {info && price ? (
        <Wrapper>
          <OverviewBox>
            <OverviewItem>
              <span>Rank</span>
              <span>{info.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol</span>
              <span>{info.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price</span>
              <span>$ {price.quotes.USD.price.toLocaleString("en", {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
            </OverviewItem>
          </OverviewBox>
          <Description>
            {info.description.length > 300 ? info.description.slice(0, 300) + "..." : info.description}
          </Description>
          <OverviewBox>
            <OverviewItem>
              <span>Total Supply</span>
              <span>{price.total_supply.toLocaleString()}</span>
            </OverviewItem>
            <OverviewItem />
            <OverviewItem>
              <span>Max Supply</span>
              <span>{price.max_supply.toLocaleString()}</span>
            </OverviewItem>
          </OverviewBox>
          <Tabs>
            <Link to="price">
              <Tab isActive={match?.params.tab === "price"}>price</Tab>
            </Link>
            <Link to="chart">
              <Tab isActive={match?.params.tab === "chart"}>chart</Tab>
            </Link>
          </Tabs>
          <Routes>
            <Route path="price" element={<Price />} />
            <Route path="chart" element={<Chart />} />
          </Routes>
        </Wrapper>
      ) : (
        <Loader />
      )}
      <Footer />
    </Container>
  );
}

export default Detail;
