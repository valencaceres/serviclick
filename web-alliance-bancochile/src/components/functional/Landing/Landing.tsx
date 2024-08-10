"use client";

import React, { useEffect } from "react";

import styles from "./Landing.module.scss";

import Holding from "@/components/ui/Holding";

import Title from "@/components/ui/Title";
import InfoSteps from "@/components/ui/InfoSteps";

import Benefit from "@/components/ui/Benefit/Benefit";
import Exclusive from "@/components/ui/Exclusive";
import Layout from "@/components/ui/Layout";

import DetailProduct from "../Detail/DetailProduct";

import { stepData } from "@/components/data/step";
import FloatingButtons from "@/components/ui/FloatingButtons";

import { useProduct } from "@/store/hooks";

const Landing = ({ initialData }: any) => {
  const { setProductList } = useProduct();

  useEffect(() => {
    setProductList(initialData);
  }, []);

  return (
    <div className={styles.landing}>
      <Layout>
        <Title
          title="Suscribe hoy tu Asistencia con un <span>30% de descuento con tus tarjetas Banco de Chile.</span> Protege tu salud, mascota y hogar."
          boldWords={["30% de descuento con tus tarjetas Banco de Chile"]}
          color="#03495C"
          size="small"
          textAlign="center"
          className={styles.customTitle}
        />
        <Title
          title="¡Elige tu beneficio!"
          boldWords={["¡Elige tu beneficio!"]}
          color="#03495C"
          size="medium"
          textAlign="center"
          className={styles.customTitle}
        />
        <DetailProduct />
        <Title
          title="¿Cómo funciona mi Asistencia?"
          boldWords={["¿Cómo funciona mi Asistencia?"]}
          color="#03495C"
          size="medium"
          textAlign="center"
          className={styles.customTitle}
        />
        <InfoSteps steps={stepData} />
        <Benefit
          text="Somos de Libre elección"
          img="/img/benefit/benefit1.png"
          img2="/img/benefit/benefit2.png"
          text2="Sin deducible"
          img3="/img/benefit/benefit3.png"
          text3="Presentes en todo Chile"
        />
        <Exclusive />
        <Holding />
      </Layout>
      <FloatingButtons
        img="/img/floating/wsp.png"
        img2="/img/floating/phone.png"
        href1="https://api.whatsapp.com/send/?phone=56939325099&text&type=phone_number&app_absent=0"
        href2="tel:6000860580"></FloatingButtons>
    </div>
  );
};

export default Landing;
