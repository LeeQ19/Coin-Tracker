import styled, { keyframes } from "styled-components";
import loaderLogo from "../react.svg";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 0 20vh 0;
  margin: 0 auto;
`;

export const Header = styled.header`
  background-color: ${props => props.theme.bgHeaderColor};
  color: ${props => props.theme.accentColor};
  height: 100px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding: 20px;
  margin-bottom: 5vh;
`;

export const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
`;

export const SubTitle = styled.h2`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 500;
`;

const loaderLogoSpin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const LoaderLogo = styled.img.attrs({
  src: `${loaderLogo}`
})`
  margin-bottom: 3vmin;
  animation: ${loaderLogoSpin} infinite 5s linear;
`;

const LoaderBox = styled.div`
  width: 50vmin;
`;

export const Loader = (() => {
  return (
    <LoaderBox>
      <LoaderLogo />
      <SubTitle>Loading...</SubTitle>
    </LoaderBox>
  );
});

export const CoinList = styled.ul``;

export const Coin = styled.li`
  background-color: ${props => props.theme.boxColor};
  width: 80vw;
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  border-radius: 15px;
  padding: 25px;
  margin-bottom: 20px;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: ${props => props.theme.hoverColor};
  }
`;

export const Icon = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

export const Overview = styled.div`
  background-color: ${props => props.theme.boxColor};
  width: 80%;
  max-width: 1000px;
  display: flex;
  justify-content: space-between;
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
  width: 72vw;
  max-width: 900px;
  text-align: center;
  letter-spacing: 0.07rem;
  line-height: 1.2;
  margin: 40px 0px;
`;

export const Tabs = styled.div`
  width: 80%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  padding: 11px;
  margin-top: 35px;
`;

export const Tab = styled.div<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 1.2rem;
  background-color: ${props => props.isActive ? props.theme.hoverColor : props.theme.boxColor};
  padding: 10px 0;
  border-radius: 15px;
`;
