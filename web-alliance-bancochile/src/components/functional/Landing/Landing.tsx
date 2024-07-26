import React from "react";
import styles from "./Landing.module.scss";

import Holding from "@/components/ui/Holding";
import Header from "@/components/ui/Header";
import Title from "@/components/ui/Title";
import InfoSteps from "@/components/ui/InfoSteps";
import { StepProps } from "@/components/ui/InfoSteps/Step";
import Contact from "@/components/ui/Contact";
import Footer from "@/components/ui/Footer";
import Benefit from "@/components/ui/Benefit/Benefit";

const stepsData: StepProps[] = [
  {
    number: 1,
    title:
      "¿Tuviste un imprevisto en salud, hogar o con tu mascota?Activa tu asistencia llamando al <strong>6000860580</strong> opción 2 y nuestros ejecutivos te guiarán.  ",
    iconColor: "#03495C",

    boldWords: [
      { text: "imprevisto", color: "#B4CD25" },
      { text: "60008065080", color: "#03495C" },
    ],
  },
  {
    number: 2,
    title:
      "Podrás obtener un <strong>descuento automático</strong> en tu asistencia de salud, utilizando tu huella con el sistema I-MED.",

    iconColor: "#1161CB",

    boldWords: [{ text: "descuento automático", color: "#B4CD25" }],
  },
  {
    number: 3,
    title:
      "En el caso de no usar el servicio IMED, los valores que correspondan al descuento de tu asistencia utilizada, serán <strong>reintegrados a tu cuenta personal.</strong>",

    iconColor: "#E84155",

    boldWords: [
      { text: "reintegrados a tu cuenta personal", color: "#B4CD25" },
    ],
  },
  {
    number: 4,
    title:
      "Solo debes enviar toda la documentación correspondiente al mail <strong>hola@serviclick.cl</strong>, antes de <strong>72 horas hábiles.</strong>",

    iconColor: "#F9B617",

    boldWords: [
      { text: "hola@serviclick.cl", color: "#B4CD25" },
      { text: "72 horas hábiles", color: "#03495C" },
    ],
  },
];

const Landing = () => {
  return (
    <div className={styles.landing}>
      <Header />
      <Title
        title="Suscribe hoy tu Asistencia con un <span>30% de descuento con tus tarjetas Banco <br/> de Chile.</span> Protege tu salud, mascota y hogar."
        boldWords={["30% de descuento con tus tarjetas Banco de Chile"]}
        color="#03495C"
        fontSize="32px"
        textAlign="center"
        className={styles.customTitle}
      />
      <Title
        title="¡Elige tu beneficio!"
        boldWords={["¡Elige tu beneficio!"]}
        color="#03495C"
        fontSize="48px"
        textAlign="center"
        className={styles.customTitle}
      />
      Cards
      <Title
        title="¿Cómo funciona mi Asistencia?"
        boldWords={["¿Cómo funciona mi Asistencia?"]}
        color="#03495C"
        fontSize="48px"
        textAlign="center"
        className={styles.customTitle}
      />
      <InfoSteps steps={stepsData} />
<Benefit text="Somos de Libre elección" img="/img/benefit/benefit1.png" img2="/img/benefit/benefit2.png" text2="Sin deducible" img3="/img/benefit/benefit3.png" text3="Presentes en todo Chile"/>
<Title
        title="Beneficio Exclusivo con: "
        boldWords={["Beneficio Exclusivo con:"]}
        color="#03495C"
        fontSize="48px"
        textAlign="center"
        className={styles.customTitle}
      />
      <img src="/img/icons/cards.png" alt="" />
      <Holding/>
      <Contact/>
      <Footer/>
    </div>
  );
};

export default Landing;
