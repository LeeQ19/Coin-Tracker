import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from "./theme";
import Router from "./routes/router";
import { GlobalStyle } from "./GlobalStyle";

const queryClient = new QueryClient();

function App() {
  const [theme, setTheme] = useState(darkTheme);

  return (
    <ThemeProvider
      theme={{
        ...theme,
        setTheme: () => {
          setTheme(theme => theme.id === "light" ? darkTheme : lightTheme)
        }
    }} >
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <Router />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
