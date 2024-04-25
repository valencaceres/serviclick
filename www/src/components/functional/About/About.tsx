import React, { useEffect } from "react";
import { animate, motion, useAnimation } from "framer-motion";
import styles from "./About.module.scss";
import { Text, TextStart } from "@/components/ui/Text/Text";
import Title from "@/components/ui/Title/Title";
import withScrollAnimation from "@/components/ui/Framer";

const About = () => {
  const AnimateDiv = withScrollAnimation("div");
  return (
    <motion.div className={styles.about}>
      {" "}
      <AnimateDiv>
        <Title color="#03495C" size="large" title="¿Qué hacemos?" />
        <Text
          color=""
          fontSize=""
          text="Somos una Compañía especialista en protección, enfocados en resolver todas las necesidades que ayuden a mejorar la vida de tus clientes, de forma accesible, eficiente y dinámica."
        />
      </AnimateDiv>
    </motion.div>
  );
};

export default About;
