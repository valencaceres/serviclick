import React from "react";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.rrss}>
        <img src="/img/footer/instagram.png" alt="" />
        <img src="/img/footer/fb.png" alt="" />
        <img src="/img/footer/linkedin.png" alt="" />
      </div>
      <img src="/img/footer/logo.png" className={styles.logo} alt="" />
    </div>
  );
};

export default Footer;
