import Head from "next/head";
import { Provider } from "react-redux";

import store from "../redux/store";

import Switch from "../components/functional/Switch";

import "../styles/app.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Head>
        <title>
          Serviclick.cl - Todas las soluciones para tu hogar, en la palma de tu
          mano
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
    </Provider>
  );
}

export default MyApp;
