import { Fragment } from "react";

import HeaderServiClick from "../../ui/HeaderServiClick";

import styles from "./Main.module.scss";

import { useUI } from "../../../hooks/store";

const Main = ({ children }: any) => {
  const { ui } = useUI();

  return (
    <Fragment>
      <Header>
        <HeaderServiClick title={ui.title} />
      </Header>
      <Section>{children}</Section>
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
