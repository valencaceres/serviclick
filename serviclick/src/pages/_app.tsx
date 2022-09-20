import { Fragment } from "react";
import Head from "next/head";

import Switch from "../components/functional/Switch";

import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
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
    </Fragment>
  );
}

export default MyApp;
