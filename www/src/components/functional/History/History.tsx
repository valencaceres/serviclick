import React from "react";

import styles from "./History.module.scss";

import CardHistory from "@/components/ui/CardHistory";
import Title from "@/components/ui/Title";
import Logo from "@/components/ui/Logo";
import { Text, TextStart } from "@/components/ui/Text/Text";
import withScrollAnimation from "@/components/ui/Framer";
import Slider from "@/components/ui/Slider/Slider";

const History = () => {
  const AnimateDiv = withScrollAnimation("div");
  return (
    <div className={styles.history}>
      <AnimateDiv>
        <div>
          <Title title="¡Nuestra motivación!" color="#03495C" size="large" />
        </div>
      </AnimateDiv>
      <div className={styles.cardContainer}>

        <Slider>


          <AnimateDiv>
            <div className={styles.cards}>
              <CardHistory
                width="250px"
                height="350px"
                backgroundImage="/img/history/f.historia.png"
                backgroundColorBack=""
                childrenFront={
                  <>
                    <Logo
                      img="/img/history/historia.png"
                      width="105px"
                      height="105px"
                    />
                    <Title title="Nuestra Historia" color="white" size="medium" />
                  </>
                }
                childrenBack={
                  <>
                    <Logo img="" width="105px" height="105px" />
                    <TextStart
                      text="Nuestra Compañía fue creada en 2002 con el objetivo de otorgar servicios de protección integral, que faciliten y aumenten la calidad de vida de las personas. Somos parte de MHM Empresas, presentes en todo Chile y Latinoamérica. Trabajamos enfocados en resolver todas las necesidades que te ayuden a mejorar tu vida, de forma accesible, eficiente y dinámica."
                      fontSize=""
                      color="white"
                    />
                    <div className={styles.line}></div>
                  </>
                }
              />
            </div>
          </AnimateDiv>
          <AnimateDiv>
            <div className={styles.cards}>
              <CardHistory
                width="250px"
                height="350px"
                backgroundImage="/img/history/f.mision.png"
                backgroundColorBack=""
                childrenFront={
                  <>
                    <Logo
                      img="/img/history/mision.png"
                      width="105px"
                      height="105px"
                    />
                    <Title title="Misión" color="white" size="medium" />
                  </>
                }
                childrenBack={
                  <>
                    <Logo img="" width="105px" height="105px" />
                    <TextStart
                      text="En Serviclick nuestro objetivo es otorgar servicios que reúnan condiciones favorables para todos nuestros stakeholders y por eso realizamos nuestro trabajo con respeto, promoviendo la confianza, la equidad y la transparencia, generando el principio de una transformación social en la que la calidad de vida y el respeto de la dignidad de cada persona sea el común denominador."
                      fontSize=""
                      color="white"
                    />
                    <div className={styles.line}></div>
                  </>
                }
              />
            </div>
          </AnimateDiv>
          <AnimateDiv>
            <div className={styles.cards}>
              <CardHistory
                width="250px"
                height="250px"
                backgroundImage="/img/history/f.vision.png"
                backgroundColorBack="linear-gradient(to right, #ff0000, #ffff00, #00ff00)"
                childrenFront={
                  <>
                    <Logo
                      img="/img/history/vision.png"
                      width="105px"
                      height="105px"
                    />
                    <Title title="Visión" color="white" size="medium" />
                  </>
                }
                childrenBack={
                  <>
                    <Logo img="" width="105px" height="105px" />
                    <TextStart
                      text="Queremos ser un referente mundial en calidad de servicio que proteja y que facilite las medidas de protección frente a riesgos inesperados,  generando un fácil acceso al servicio, mejorando  la expectativa y calidad de vida de todos las personas. Queremos crear un futuro mejor para todos, donde  puedan estar protegidos y confiados con nuestro servicio de calidad."
                      fontSize=""
                      color="white"
                    />
                    <div className={styles.line}></div>
                  </>
                }
              />
            </div>
          </AnimateDiv></Slider>
      </div>

      <div className={styles.textcontainer}>
        <AnimateDiv>
          <Title
            title="¿Tienes dificultades para recaudar desde tus clientes?"
            color="#03495C"
            size="large"
          />
        </AnimateDiv>
        <AnimateDiv>
          <div className={styles.content}>
            <Logo
              img="/img/history/celu.png"
              width="180px"
              height="180px"
              thirdImg="/img/history/celu.png"
              thirdImgHeight="180px"
              thirdImgWidth="180px"
            />

            <div className={styles.text}>
              <div className={styles.subtitle}>
                <Title title="PLAR" color="#B4CD25" size="medium" />
                <Title
                  title="Plataforma de recaudación recurrente"
                  color="#03495C"
                  size="medium"
                />
              </div>
              <div className={styles.paragraph}>
                <TextStart
                  color=""
                  fontSize="20px"
                  text="¡No te preocupes!, nosotros contamos con una plataforma que puede realizar cargos recurrentes a tus clientes, en la periodicidad que necesites, en el tipo de moneda que más te convenga (pesos, UF) y que luego de un par de clics de configuración, llegue el dinero mes a mes a tu cuenta, con cualquier medio de pago electrónico (débito, crédito, prepago) que tenga tu cliente."
                />
              </div>
            </div>
          </div>
        </AnimateDiv>
      </div>
    </div>
  );
};

export default History;