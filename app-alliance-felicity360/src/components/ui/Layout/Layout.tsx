import React, { useEffect, useState } from "react";

import styles from "./Layout.module.scss";

import Header from "../Header/Header";
import Contact from "@/components/ui/Contact/Contact";
import Footer from "@/components/ui/Footer/Footer";

interface LayoutProps {
  children: React.ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 1) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.addEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className={styles.layout}>
      <Header backgroundColor={isScrolled ? "black" : "transparent"} />
      {children}
      <Contact />
      <Footer />
    </div>
  );
};

export default Layout;
