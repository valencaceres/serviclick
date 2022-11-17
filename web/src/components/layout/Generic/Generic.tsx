/* eslint-disable @next/next/inline-script-id */
import React, { Fragment } from "react";
import Script from "next/script";
// import Head from "next/head";

import HeadPages from "../HeadPages";

import styles from "./Generic.module.scss";

const Screen = ({ children }: any) => {
  return (
    <Fragment>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=G-3X55MR03FG`}
      />
      <Script strategy="lazyOnload">
        {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-3X55MR03FG', {
                    page_path: window.location.pathname,
                    });
                `}
      </Script>
      {/* <Head>
        <title>
          Serviclick.cl - Todas las soluciones para tu hogar, en la palma de tu
          mano
        </title>
        <meta
          name="description"
          content="Serviclick.cl - Todas las soluciones para tu hogar, en la palma de tu mano"
        />
        <link rel="icon" href="/favicon.png" />
      </Head> */}
      <HeadPages
        title="ServiClick.cl"
        description="Todas las soluciones para tu hogar, en la palma de tu mano"
      />
      <div className={styles.screen}>{children}</div>
    </Fragment>
  );
};

export { Screen };
