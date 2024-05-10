import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import store from "../redux/store";

import Switch from "../components/functional/Switch";

import "../styles/app.css";

import type { AppProps } from "next/app";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <Switch>
            <Component {...pageProps} />
            <ReactQueryDevtools initialIsOpen={false} />
          </Switch>
        </Provider>
      </QueryClientProvider>
  );
}

export default MyApp;
