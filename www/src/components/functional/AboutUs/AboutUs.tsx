import React from "react";

import styles from "./AboutUs.module.scss";

import CardAboutUs from "@/components/ui/CardAboutUs";
import Title from "@/components/ui/Title";
import Slider from "@/components/ui/Slider/Slider";



import withScrollAnimation from "@/components/ui/Framer";



const AboutUs = () => {
  const AnimateDiv = withScrollAnimation("div");
  return (

    <div className={styles.aboutus} id="sobre">
      <div className={styles.mobile}>

        <Slider>
          <div className={styles.title}>
            <Title title="Quienes somos" size="medium" color="white" />
          </div>
          <CardAboutUs
            img="/img/aboutus/carlos.png"
            title="Carlos Molina "
            paragraph="CEO"
            width="150px"
            height="150px"
          />
          <CardAboutUs
            img="/img/aboutus/andrea.png"
            title="Andrea Hernández"
            paragraph="Gerente de Administración y Finanzas "
            width="150px"
            height="150px"
          />
          <CardAboutUs
            img="/img/aboutus/enzzo.png"
            title="Enzzo Molina"
            paragraph="Gerente de Operaciones "
            width="150px"
            height="150px"
          />
        </Slider>
      </div>
      <AnimateDiv>

      </AnimateDiv>
      <div className={styles.cards}>
        <AnimateDiv>
          <CardAboutUs
            img="/img/aboutus/carlos.png"
            title="Carlos Molina "
            paragraph="CEO"
            width="150px"
            height="150px"
          />
        </AnimateDiv>
        <AnimateDiv>
          <CardAboutUs
            img="/img/aboutus/andrea.png"
            title="Andrea Hernández"
            paragraph="Gerente de Administración y Finanzas "
            width="150px"
            height="150px"
          />
        </AnimateDiv>
        <AnimateDiv>
          <CardAboutUs
            img="/img/aboutus/enzzo.png"
            title="Enzzo Molina"
            paragraph="Gerente de Operaciones "
            width="150px"
            height="150px"
          />
        </AnimateDiv>
      </div>

    </div>

  );
};

export default AboutUs;
