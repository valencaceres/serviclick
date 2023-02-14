import React from "react";

import BreadCumbs from "../../ui/BreadCumbs";

import styles from "./Form.module.scss";

const Screen = ({ children, width }: any) => {
  return (
    <div className={styles.screen} style={{ width }}>
      {children}
    </div>
  );
};

const Content = ({ children }: any) => {
  return (
    <div className={styles.content}>
      <BreadCumbs />
      {/* <Aside>
      </Aside>
      <Article>{children}</Article>
      <Aside>&nbsp;</Aside> */}
      {/* <BreadCumbs /> */}
      {children}
    </div>
  );
};

const Aside = ({ children }: any) => {
  return <div className={styles.aside}>{children}</div>;
};

const Article = ({ children }: any) => {
  return <div className={styles.article}>{children}</div>;
};

const Footer = ({ children }: any) => {
  return <div className={styles.footer}>{children}</div>;
};

const Col = ({ children, width, gap = "5px" }: any) => {
  return (
    <div className={styles.col} style={{ width, gap }}>
      {children}
    </div>
  );
};

const Row = ({ children, align = "flex-start", gap = "5px" }: any) => {
  return (
    <div className={styles.row} style={{ justifyContent: align, gap }}>
      {children}
    </div>
  );
};

export { Screen, Content, Aside, Article, Footer, Col, Row };
