import { Provider } from "react-redux";
import { ClerkProvider } from "@clerk/nextjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import store from "../redux/store";

import Switch from "../components/functional/Switch";

import "../styles/app.css";

import type { AppProps } from "next/app";
import { esES } from "@clerk/localizations";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider {...pageProps} localization={esES}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <Switch>
            <Component {...pageProps} />
            <ReactQueryDevtools initialIsOpen={false} />
          </Switch>
        </Provider>
      </QueryClientProvider>
    </ClerkProvider>
  );
}

export default MyApp;
