import React from "react";

import styles from "./Layout.module.scss"

import Hero from "../functional/Hero";
import Footer from "../functional/Footer";
import Contact from "../functional/Contact";

interface LayoutProps {
  children: React.ReactNode;
  heroMessage: string;
  showHeroLine?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, heroMessage, showHeroLine = true }) => {
  return (
    <>
      <Hero message={heroMessage} showLine={showHeroLine} />
      <main className={styles.layout}>{children}</main>
      <Contact img="/img/contact/mapa.png" width="280px" height="240px" />
      <Footer />
    </>
  );
};

export default Layout;
