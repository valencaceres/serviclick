import React, { Fragment } from "react";
import Head from "next/head";

import styles from "./Generic.module.scss";

const Screen = ({ children }: any) => {
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
      <div className={styles.screen}>{children}</div>
    </Fragment>
  );
};

export { Screen };
