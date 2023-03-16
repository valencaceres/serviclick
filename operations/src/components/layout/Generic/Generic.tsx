import Head from "next/head";
import styles from "./Generic.module.scss";

const PageHeader = () => {
  return (
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
  );
};

const LayoutScreen = ({ children }: any) => {
  return <div className={styles.screen}>{children}</div>;
};

const LayoutHeader = ({ children }: any) => {
  return <div className={styles.header}>{children}</div>;
};

const LayoutBody = ({ children }: any) => {
  return <div className={styles.body}>{children}</div>;
};

export { LayoutScreen, LayoutHeader, LayoutBody, PageHeader };
