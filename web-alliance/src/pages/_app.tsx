import type { AppProps } from "next/app";
import Head from "next/head";
import { Fragment, useEffect } from "react";

import Main from "../components/layout/Main/Main";

import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Head>
        <title>
          ServiClick.cl - Todas las soluciones para tu hogar, en la palma de tu
          mano
        </title>
        <meta
          name="description"
          content="ServiClick.cl - Todas las soluciones para tu hogar, en la palma de tu mano"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Main>
        <Component {...pageProps} />
      </Main>
    </Fragment>
  );
}
