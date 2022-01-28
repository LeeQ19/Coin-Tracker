import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'
import { ThemeProvider } from 'styled-components';
import { darkTheme } from "./theme";
import Router from "./routes/router";
import { GlobalStyle } from "./GlobalStyle";

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <Router />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
