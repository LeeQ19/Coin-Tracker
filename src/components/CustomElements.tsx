import { memo } from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import loaderLogo from "../icons/react.svg";
import lightBack from "../icons/lightBack.png";
import darkBack from "../icons/darkBack.png";
import lightTheme from "../icons/lightTheme.png";
import darkTheme from "../icons/darkTheme.png";
import { isDarkAtom } from "../atoms";

export const Container = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
  background-color: ${props => props.theme.bgColor};
  color: ${props => props.theme.textColor};
  transition: 0.5s;
`;

export const Header = styled.header`
  height: 10vh;
  min-height: 80px;
  max-height: 130px;
  grid-row: 1;
  background-color: ${props => props.theme.bgHeaderColor};
  color: ${props => props.theme.accentColor};
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: 1fr 4fr 1fr;
  grid-template-areas:
    "back   title     theme"
    "back   subtitle  theme";
  margin-bottom: 20px;
`;

export const Title = styled.div`
  grid-area: title;
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
`;

export const SubTitle = styled.div`
  grid-area: subtitle;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.7rem;
  font-weight: 500;
`;

export const BackBtn = memo(() => {
  const isDark = useRecoilValue(isDarkAtom);

  const BackImg = styled.img`
    height: 7vh;
    min-height: 30px;
    max-height: 70px;
  `;

  const BackBox = styled.div`
    grid-area: back;
    justify-self: center;
    align-self: center;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    border-radius: 100%;
    cursor: pointer;
    &:hover {
      background-color: ${props => props.theme.hoverColor};
    }
  `;

  return (
    <BackBox>
      <Link to="/">
        <BackImg src={`${isDark ? darkBack : lightBack}`} />
      </Link>
    </BackBox>
  );
});

export const ThemeBtn = memo(() => {
  const [isDark, setIsDark] = useRecoilState(isDarkAtom);


  const ThemeImg = styled.img`
    height: 6vh;
    min-height: 30px;
    max-height: 70px;
    margin-bottom: 2px;
  `;

  const ThemeBox = styled.div`
    grid-area: theme;
    justify-self: center;
    align-self: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    font-weight: 700;
    padding: 0.7vmin 1.6vmin;
    border-radius: 20%;
    cursor: pointer;
    &:hover {
      background-color: ${props => props.theme.hoverColor};
    }
  `;

  return (
    <ThemeBox onClick={() => {setIsDark((v) => !v)}} >
      <ThemeImg src={`${isDark ? darkTheme : lightTheme}`} />
      <p>{isDark ? "Light" : "Dark"}</p>
    </ThemeBox>
  );
});

export const Footer = memo(() => {
  const Foot = styled.div`
    grid-row: 3;
    max-height: 10vh;
    background-color: ${props => props.theme.bgHeaderColor};
    font-size: 0.8rem;
    text-align: center;
    letter-spacing: 0.07rem;
    line-height: 1.2;
    padding: 10px 0;
    margin-top: 50px;
  `;

  return (
    <Foot>
      <p>Designed by LeeQ19</p>
      <p>Built using React</p>
      <p>Data provided by Coinpaprika</p>
    </Foot>
  );
});

export const Loader = () => {
  const loaderLogoSpin = keyframes`
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  `;

  const LoaderLogo = styled.img.attrs({
    src: `${loaderLogo}`,
  })`
    width: 50vmin;
    max-width: 500px;
    margin-bottom: 3vmin;
    animation: ${loaderLogoSpin} infinite 5s linear;
  `;

  const LoaderBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `;

  return (
    <LoaderBox>
      <LoaderLogo />
      <SubTitle>Loading...</SubTitle>
    </LoaderBox>
  );
};

export const CoinList = styled.ul`
  grid-row: 2;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;
`;

export const CoinBox = styled.li`
  background-color: ${props => props.theme.boxColor};
  width: 85vw;
  max-width: 900px;
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  border-radius: 15px;
  padding: 25px;
  margin-bottom: 20px;
  transition: 0.5s;
  cursor: pointer;
  &:hover {
    background-color: ${props => props.theme.hoverColor};
  }
`;

export const Icon = styled.img`
  height: 1.7rem;
  margin-right: 10px;
`;

export const Wrapper = styled.div`
  grid-row: 2;
  width: 85vw;
  max-width: 900px;
  min-height: 100vh;
  justify-self: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const OverviewBox = styled.div`
  background-color: ${props => props.theme.boxColor};
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  font-size: 1.5rem;
  padding: 10px 20px;
  border-radius: 15px;
`;

export const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 1rem;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

export const Description = styled.p`
  width: 97%;
  min-height: 100px;
  max-height: 200px;
  display: flex;
  align-items: center;
  letter-spacing: 0.07rem;
  line-height: 1.2;
  margin: 40px 0px;
`;

export const Tabs = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  padding: 0;
  margin-top: 35px;
`;

export const Tab = styled.div<{ isActive: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  font-size: 1.2rem;
  background-color: ${props => (props.isActive ? props.theme.hoverColor : props.theme.boxColor)};
  padding: 10px 0;
  border-radius: 15px;
  cursor: pointer;
`;

export const ChartWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 4fr 1fr;
  gap: 50px;
  margin-top: 20px;
`;

export const ChartTabs = styled.div`
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  gap: 30px;
  padding: 90px 0px 90px 0px;
`;

export const PriceWrapper = styled.div`
  width: 100%;
  height: 40vh;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

export const PriceBox = styled.div`
  background-color: ${props => props.theme.boxColor};
  width: 100%;
  height: 10vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.5rem;
  padding: 10px 20px;
  border-radius: 15px;
  margin: 10px 0;
  span:first-child {
    font-size: 1.3rem;
  }
`;
