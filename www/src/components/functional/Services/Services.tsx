import React from "react";
import Link from "next/link";

import styles from "./Services.module.scss";

import ImgServices from "@/components/ui/ImgServices/ImgServices";
import Title from "@/components/ui/Title";
import { TitleBackground } from "@/components/ui/TitleBackground/TitleBackground";
import CardServices from "@/components/ui/CardServices";
import { motion, useScroll } from "framer-motion";
import withScrollAnimation from "@/components/ui/Framer";
import Slider from "@/components/ui/Slider/Slider";


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
        <div className={styles.desktitle}>
          <Link href="/servicios" className={styles.title} ><TitleBackground
            color="white"
            fontSize=""
            backgroundColor="#03495C"
            title="ENCUENTRA NUESTROS PRODUCTOS AQUÍ"
          /></Link>
        </div>


      </AnimateDiv>
      <AnimateDiv>
        <div className={styles.desktop}>
          <CardServices />
        </div>

      </AnimateDiv>

      <div className={styles.imgContainer}>
        <Slider>
          <ImgServices
            imageUrl="/img/services/serv1.png"
            buttonText="Ver más"
          >
            <h2>Puedes encontrar beneficios para tus clientes en:</h2>
            <ul>
              <li>Atención Ambulatoria</li>
              <li>Atención de Urgencias </li>
              <li>Atención de Especialista</li>
              <li>Telemedicina</li>
              <li>Descuento en farmacias </li>
              <li>Exámenes y mucho más</li>
            </ul>
          </ImgServices>
          <ImgServices
            imageUrl="/img/services/serv2.png"
            buttonText="Ver más"
          >
            <h2>Puedes encontrar beneficios para tus clientes en:</h2>
            <ul>
              <li>Servicios de Plomería</li>
              <li>Servicios de Cerrajería</li>
              <li>Servicios de Vidriería</li>
              <li>Servicios de Electricista</li>
              <li>Servicios de PinturaServicios de Vidriería</li>
              <li>Instalaciones, perforaciones y mucho más</li>
            </ul>
          </ImgServices>
          <ImgServices
            imageUrl="/img/services/serv3.png"
            buttonText="Ver más"
          >
            <h2>Puedes encontrar beneficios para tus clientes en:</h2>
            <ul>
              <li>Atención Urgencia Veterinaria </li>
              <li>Atención Consulta Veterinaria</li>
              <li>Vacuna Antirrábica</li>
              <li>Asistencia Legal Telefónica </li>
              <li>Descuentos en Farmacias y mucho más </li>
            </ul>
          </ImgServices>
          <ImgServices
            imageUrl="/img/services/serv4.png"
            buttonText="Ver más"
          >
            <h2>Puedes encontrar beneficios para tus clientes en:</h2>
            <ul>
              <li>Protección para neumáticos / amortiguadores</li>
              <li>Cerrajería vehícular</li>
              <li>Protección Insignia o Emblema</li>
              <li>Urgencia médica por accidente en bicicleta</li>
              <li>Asistencia Legal Telefónica</li>
              <li>Descuentos en farmacias y mucho más</li>
            </ul>
          </ImgServices>

        </Slider>

        <Link href="/servicios"><TitleBackground
          color="white"
          fontSize=""
          backgroundColor="#03495C"
          title="ENCUENTRA NUESTROS PRODUCTOS AQUÍ"
        /></Link>
      </div>
    </motion.div>


  );
};

export default Services;
