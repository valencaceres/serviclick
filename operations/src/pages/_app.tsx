import Head from "next/head";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";

import store from "../redux/store";

import Switch from "../components/functional/Switch";

import "../styles/app.css";
import "react-toastify/dist/ReactToastify.css";

import type { AppProps } from "next/app";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Head>
          <title>
            Serviclick.cl - Todas las soluciones para tu hogar, en la palma de
            tu mano
          </title>
          <meta
            name="description"
            content="Serviclick.cl - Todas las soluciones para tu hogar, en la palma de tu mano"
          />
          <link rel="icon" href="/favicon.png" />
        </Head>
        <Switch>
          <Component {...pageProps} />
        </Switch>
        <ToastContainer />
        <ReactQueryDevtools initialIsOpen={false} />
      </Provider>
    </QueryClientProvider>
  );
}

export default MyApp;
