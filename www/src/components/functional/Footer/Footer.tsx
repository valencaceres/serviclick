import React from "react";

import styles from "./Footer.module.scss";

import Logo from "@/components/ui/Logo";
import Title from "@/components/ui/Title";

import withScrollAnimation from "@/components/ui/Framer";

const Footer = () => {
  const AnimateDiv = withScrollAnimation("div");
  return (
    <div className={styles.footer}>
      <AnimateDiv>
        <div className={styles.content}>
          <div className={styles.text}>
            <Title
              title="Términos y condiciones"
              size="small"
              color="white"
            ></Title>
            <Title
              title="Trabaja con nosotros "
              size="small"
              color="white"
            ></Title>
          </div>
          <div className={styles.text}>
            <Title
              title="Contacto Empresas "
              size="small"
              color="white"
            ></Title>
            <Title
              title="Contacto Comercial "
              size="small"
              color="white"
            ></Title>
          </div>
        </div>
      </AnimateDiv>

      <div>
        <Logo
          img="/img/footer/logo.png"
          width="252px"
          height="53px"
          thirdImg="/img/footer/logo.png"
          thirdImgHeight="53px"
          thirdImgWidth="252px"
        />
      </div>
    </div>
  );
};

export default Footer;
