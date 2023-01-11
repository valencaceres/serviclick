import { Fragment } from "react";

import HeaderServiClick from "../../ui/HeaderServiClick";

import styles from "./Main.module.scss";

const Main = ({ children }: any) => {
  return (
    <Fragment>
      <Header>
        <HeaderServiClick />
      </Header>
      <Section>{children}</Section>
      <Footer />
    </Fragment>
  );
};

const Header = ({ children }: any) => {
  return <header className={styles.header}>{children}</header>;
};

const Section = ({ children }: any) => {
  return <section className={styles.section}>{children}</section>;
};

const Footer = () => {
  return <footer className={styles.footer}></footer>;
};

export default Main;
