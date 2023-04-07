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

const Screen = ({ children }: any) => {
  return <div className={styles.screen}>{children}</div>;
};

const Header = ({ children }: any) => {
  return <div className={styles.header}>{children}</div>;
};

const Body = ({ children }: any) => {
  return <div className={styles.body}>{children}</div>;
};

interface IContent {
  children: any;
}

const Content = ({ children }: IContent) => {
  return <div className={styles.content}>{children}</div>;
};

interface ICol {
  children: any;
  width?: string;
  gap: string;
}

const Col = ({ children, width, gap }: ICol) => {
  return (
    <div className={styles.col} style={{ width, gap }}>
      {children}
    </div>
  );
};

interface IRow {
  children: any;
  gap: string;
}

const Row = ({ children, gap }: IRow) => {
  return (
    <div className={styles.row} style={{ gap }}>
      {children}
    </div>
  );
};

export { Screen, Header, Body, PageHeader, Content, Col, Row };
