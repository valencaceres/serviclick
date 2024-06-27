import React from "react";

import styles from "./Landing.module.scss";

import Paragraph from "@/components/ui/Paragraph/Paragraph";
import Card from "@/components/ui/Card/Card";
import Benefit from "@/components/ui/Benefit/Benefit";
import Holding from "@/components/ui/Holding/Holding";
import Exclusive from "@/components/ui/Exclusive/Exclusive";
import WallpaperVideo from "@/components/ui/WallpaperVideo/WallpaperVideo";
import { ContentCol, ContentRow } from "@/components/layout/Content";
import { productData } from "@/data/product";
import { content, wordsWithStyles } from "@/data/landing";
import { benefitData } from "@/data/benefit";

const Landing = () => {
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
          {benefitData.map((benefit, index) => (
            <Benefit key={index} text={benefit.text} img={benefit.image} />
          ))}
        </ContentRow>

        <Holding />
        <Exclusive />
      </ContentCol>
    </>
  );
};
export default Landing;
