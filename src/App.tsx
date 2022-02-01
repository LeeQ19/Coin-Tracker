import { useRecoilValue } from "recoil";
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from "./theme";
import Router from "./routes/router";
import { GlobalStyle } from "./GlobalStyle";
import { isDarkAtom } from "./atoms";

function App() {
  const isDark = useRecoilValue(isDarkAtom);

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme} >
      <GlobalStyle />
      <Router />
    </ThemeProvider>
  );
}

export default App;
