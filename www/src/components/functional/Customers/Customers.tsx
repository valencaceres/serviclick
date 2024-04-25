import React from "react";

import styles from "./Customers.module.scss";

import Logo from "@/components/ui/Logo";
import Title from "@/components/ui/Title";
import withScrollAnimation from "@/components/ui/Framer";

const Customers = () => {
  const AnimateDiv = withScrollAnimation("div");
  return (
    <AnimateDiv>
      <div className={styles.customers}>
        <Title
          title="Empresas que confían en nosotros "
          color="#03495C"
          size="large"
        />

        <div className={styles.rowOne}>
          <Logo
            img="/img/customers/ripley.png"
            thirdImg="/img/customers/ripley.png"
            thirdImgHeight="70px"
            thirdImgWidth="282px"
            width="282px"
            height="70px"
          />
          <Logo
            img="/img/customers/bci.png"
            width="282px"
            height="70px"
            thirdImg="/img/customers/bci.png"
            thirdImgHeight="70px"
            thirdImgWidth="282px"
          />
          <Logo
            img="/img/customers/consorcio.png"
            width="282px"
            height="70px"
            thirdImg="/img/customers/consorcio.png"
            thirdImgHeight="70px"
            thirdImgWidth="282px"
          />
          <Logo
            img="/img/customers/sura.png"
            width="282px"
            height="70px"
            thirdImg="/img/customers/sura.png"
            thirdImgHeight="70px"
            thirdImgWidth="282px"
          />
        </div>

        <div className={styles.rowTwo}>
          <Logo
            img="/img/customers/scotiabank.png"
            width="282px"
            height="98px"
            thirdImg="/img/customers/scotiabank.png"
            thirdImgHeight="98px"
            thirdImgWidth="282px"
          />
          <Logo
            img="/img/customers/cardif.png"
            width="282px"
            height="98px"
            thirdImg="/img/customers/cardif.png"
            thirdImgHeight="98px"
            thirdImgWidth="282px"
          />
          <Logo
            img="/img/customers/coaniquem.png"
            width="282px"
            height="98px"
            thirdImg="/img/customers/coaniquem.png"
            thirdImgHeight="98px"
            thirdImgWidth="282px"
          />
          <Logo
            img="/img/customers/prosegur.png"
            width="282px"
            height="98px"
            thirdImg="/img/customers/prosegur.png"
            thirdImgHeight="98px"
            thirdImgWidth="282px"
          />
        </div>

        <div className={styles.rowThree}>
          <Logo
            img="/img/customers/multihogar.png"
            width="200px"
            height="119px"
            thirdImg="/img/customers/multihogar.png"
            thirdImgHeight="119px"
            thirdImgWidth="200px"
          />
          <Logo
            img="/img/customers/heroes.png"
            width="200px"
            height="119px"
            thirdImg="/img/customers/heroes.png"
            thirdImgHeight="119px"
            thirdImgWidth="200px"
          />
          <Logo
            img="/img/customers/vspt.png"
            width="200px"
            height="119px"
            thirdImg="/img/customers/vspt.png"
            thirdImgHeight="119px"
            thirdImgWidth="200px"
          />
          <Logo
            img="/img/customers/hotel.png"
            width="200px"
            height="119px"
            thirdImg="/img/customers/hotel.png"
            thirdImgHeight="119px"
            thirdImgWidth="200px"
          />
        </div>
      </div>
    </AnimateDiv>
  );
};

export default Customers;
