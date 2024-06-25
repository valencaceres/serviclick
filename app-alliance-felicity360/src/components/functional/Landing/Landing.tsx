import React from "react";

import styles from "./Landing.module.scss";

import Paragraph from "@/components/ui/Paragraph/Paragraph";
import Card from "@/components/ui/Card/Card";
import Benefit from "@/components/ui/Benefit/Benefit";
import Holding from "@/components/ui/Holding/Holding";
import Exclusive from "@/components/ui/Exclusive/Exclusive";
import WallpaperVideo from "@/components/ui/WallpaperVideo/WallpaperVideo";
import { ContentCol, ContentRow } from "@/components/layout/Content";


const Landing = () => {
  const productData = [
    {
      title: "Asistencia Integral Pro ",
      paragraph:
        "Podrás obtener beneficios en: Urgencia Médica por Accidente, Urgencia Médica  por Enfermedad, Atención Médica Ambulatoria,  Descuento en Farmacias, Telemedicina, Orientación Médica Telefónica,  Médico a Domicilio. ",
      traced: " $14.990",
      priceText: "$11.990",
      discountText: "20%",
      beneficiaryText: "$3.590 (cada carga)",
      buttonLink: "/detail?prod=integralPro",
      buttonText: "VER MÁS",
      img: "/img/card/asistencia1.png",
    },
    {
      title: "Asistencia Mascota Pro",
      paragraph:
        "Podrás obtener beneficios en: Urgencia Veterinaria, Consulta Médica, Descuento en Farmacias, Telemedicina, Asistencia Legal Telefónica, Vacuna Antirrábica.",
      traced: " $8.590",
      priceText: "$6.870",
      discountText: "20%",
      buttonLink: "/detail?prod=mascotalPro",
      buttonText: "VER MÁS",
      img: "/img/card/asistencia2.png",
    },
    {
      title: "Asistencia Hogar Pro ",
      paragraph:
        "Podrás obtener beneficios en: Plomería, Cerrajería, Servicios de Electricidad, Instalación de Lámparas e Iluminaria, Servicios de Pintura Baño y Cocina, Perforaciones en Muro. ",
      traced: " $9.490",
      priceText: "$7.590",
      discountText: "20%",
      buttonLink: "/detail?prod=hogarPro",
      buttonText: "VER MÁS",
      img: "/img/card/asistencia3.png",
    },
  ];

  const content =
    "Junto a Felicity 360, te brindamos las mejores Asistencias diseñadas especialmente para ti y tu seres queridos. ";
  const wordsWithStyles = [
    {
      word: "360,",
      color: "#29ABE2",
      fontWeight: "bolder",
    },
    {
      word: "Felicity",
      color: "#DE0079",
      fontWeight: "bolder",
    },
  ];

  return (
    <>
   
      <WallpaperVideo
        backgroundVideo="/video/banner.mp4"
        width={1240}
        height={500}
      >
        ASISTENCIAS QUE TE PROTEGEN <br /> EN TODO MOMENTO
      </WallpaperVideo>
      <ContentCol width="1200px" gap="20px">
        <Paragraph content={content} wordsWithStyles={wordsWithStyles} />

        <ContentCol gap="25px">
          {productData.map((product, index) => (
            <Card key={index} {...product} />
          ))}
        </ContentCol>
        <Paragraph content="BENEFICIOS" />
        <ContentRow
          width="1200px"
          flexWrap="wrap"
          justifyContent="center"
          gap="30px"
        >
          <Benefit text="50% en farmacias" img="/img/benefit/img1.png" />
          <Benefit
            text="Fonasa/Isapre (Incluye Fonasa A)"
            img="/img/benefit/img2.png"
          />
          <Benefit
            text="Preexistencias Flexibles"
            img="/img/benefit/img3.png"
          />
          <Benefit
            text="Tú eliges donde atenderte, estamos en todo Chile."
            img="/img/benefit/img4.png"
          />
          <Benefit text="Asistencia 24/7" img="/img/benefit/img5.png" />
          <Benefit
            text="Alivia el costo de imprevistos en 72 hrs."
            img="/img/benefit/img6.png"
          />
        </ContentRow>

        <Holding />
        <Exclusive />

      </ContentCol>
      
    </>
  );
};
export default Landing;
