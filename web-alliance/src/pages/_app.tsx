/* eslint-disable @next/next/inline-script-id */
import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Main from "../components/layout/Main/Main";

import "../styles/globals.css";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=G-FBMKNKD7PQ`}
      />
      <Script strategy="lazyOnload">
        {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-FBMKNKD7PQ', {
                    page_path: window.location.pathname,
                    });
                `}
      </Script>
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
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
