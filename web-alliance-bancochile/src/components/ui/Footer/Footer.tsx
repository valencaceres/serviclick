import React from "react";
import styles from "./Footer.module.scss";

import instagram from "./images/instagram.png";
import fb from "./images/fb.png";
import linkedin from "./images/linkedin.png";
import logo from "./images/logo.png";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.rrss}>
        <img src={instagram.src} alt="" />
        <img src={fb.src} alt="" />
        <img src={linkedin.src} alt="" />
      </div>
      <img src={logo.src} className={styles.logo} alt="" />
    </div>
  );
};

export default Footer;
