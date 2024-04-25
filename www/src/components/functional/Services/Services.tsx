import React from "react";

import styles from "./Services.module.scss";
import Title from "@/components/ui/Title";
import { TitleBackground } from "@/components/ui/TitleBackground/TitleBackground";
import CardServices from "@/components/ui/CardServices";
import { motion, useScroll } from "framer-motion";
import withScrollAnimation from "@/components/ui/Framer";

const Services = () => {
  const AnimateDiv = withScrollAnimation("div");
  return (
    <motion.div
      id="servicios"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={styles.services}
    >
      <AnimateDiv>
        <Title
          color="#03495c"
          size="large"
          title="Soluciones para tus clientes"
        />
        <TitleBackground
          color="white"
          fontSize=""
          backgroundColor="#03495C"
          title="ENCUENTRA NUESTROS PRODUCTOS AQUÍ"
        />{" "}
      </AnimateDiv>
      <AnimateDiv>
        <CardServices />
      </AnimateDiv>
    </motion.div>
  );
};

export default Services;
