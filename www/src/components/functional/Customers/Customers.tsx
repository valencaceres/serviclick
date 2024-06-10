import React from "react";

import styles from "./Customers.module.scss";

import withScrollAnimation from "@/components/ui/Framer";

import Slider from "@/components/ui/Slider/Slider";



const Customers = () => {
  const AnimateDiv = withScrollAnimation("div");
  const AnimatedSlider = withScrollAnimation("Slider");

  return (
    <AnimateDiv>
      <AnimatedSlider>

        <div className={styles.customers}>
          <h2>Empresas que confían en nosotros </h2>

          <img src="/img/customers/ripley.png" alt="" />
          <img src="/img/customers/bci.png" alt="" />
          <img src="/img/customers/consorcio.png" alt="" />
          <img src="/img/customers/sura.png" alt="" />
          <img src="/img/customers/scotiabank.png" alt="" />
          <img src="/img/customers/cardif.png" alt="" />
          <img src="/img/customers/coaniquem.png" alt="" />
          <img src="/img/customers/prosegur.png" alt="" />
          <img src="/img/customers/multihogar.png" alt="" />
          <img src="/img/customers/heroes.png" alt="" />
          <img src="/img/customers/vspt.png" alt="" />
          <img src="/img/customers/hotel.png" alt="" />
        </div>


        <Slider>
          <img src="/img/customers/ripley.png" alt="" />
          <img src="/img/customers/bci.png" alt="" />
          <img src="/img/customers/consorcio.png" alt="" />
          <img src="/img/customers/sura.png" alt="" />
          <img src="/img/customers/scotiabank.png" alt="" />
          <img src="/img/customers/cardif.png" alt="" />
          <img src="/img/customers/coaniquem.png" alt="" />
          <img src="/img/customers/prosegur.png" alt="" />
          <img src="/img/customers/multihogar.png" alt="" />
          <img src="/img/customers/heroes.png" alt="" />
          <img src="/img/customers/vspt.png" alt="" />
          <img src="/img/customers/hotel.png" alt="" />
        </Slider>
      </AnimatedSlider>
    </AnimateDiv>
  );
};

export default Customers;
