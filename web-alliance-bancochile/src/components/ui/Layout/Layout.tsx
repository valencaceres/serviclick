"use client";

import React, { useEffect, useState } from "react";

import styles from "./Layout.module.scss";

import Header from "../Header";
import Contact from "../Contact";
import Footer from "../Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    if (typeof window !== "undefined") {
      const offset = window.scrollY;
      if (offset > 1) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  return (
    <div className={`${styles.layout} ${isScrolled ? styles.scrolled : ""}`}>
      <Header />
      <div className={styles.children}>{children}</div>
      <Contact />
      <Footer />
    </div>
  );
};

export default Layout;
