import { useQuery } from "react-query";
import {
  Routes,
  Route,
  useLocation,
  useParams,
  Link,
  useMatch,
} from "react-router-dom";

import { ILocation, IInfo, IPrice } from "./interface";
import { getInfo, getPrice } from "../components/api";
import Chart from "./Chart";
import Price from "./Price";
import {
  Container,
  Header,
  Title,
  SubTitle,
  Loader,
  Icon,
  Overview,
  OverviewItem,
  Description,
  Tabs,
  Tab
} from "../components/CustomElements";


function Coin() {
  const urlIcon = "https://cryptoicon-api.vercel.app/api/icon/";
  const { coinId } = useParams();
  const { state } = useLocation() as ILocation;
  const match = useMatch("/:coinId/:tab");
  const { data: info } = useQuery<IInfo>(["info", coinId], () => getInfo(coinId!));
  const { data: price } = useQuery<IPrice>(["price", coinId], () => getPrice(coinId!));


  return (
    <Container>
      <Header>
        <Title>Coin - Tracker</Title>
        {info ? (
          <SubTitle>
            <Icon src={urlIcon + info.symbol.toLowerCase()} />
            {info.name}
          </SubTitle>
        ) : (
          state ? (
            <SubTitle>
              <Icon src={urlIcon + state.symbol.toLowerCase()} />
              {state.name}
            </SubTitle>
          ) : (
            <SubTitle>{coinId}</SubTitle>
          )
        )}
      </Header>
      {info && price ? (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{info.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${info.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Open Source:</span>
              <span>{info.open_source ? "Yes" : "No"}</span>
            </OverviewItem>
          </Overview>
          <Description>{info.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{price.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{price.max_supply}</span>
            </OverviewItem>
          </Overview>
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
        </>
      ) : (
        <Loader />
      )}
    </Container>
  );
}

export default Coin;
