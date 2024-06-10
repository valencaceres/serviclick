import React from "react";

import styles from "./New.module.scss";

import Title from "@/components/ui/Title";
import withScrollAnimation from "@/components/ui/Framer";
import Slider from "@/components/ui/Slider/Slider";


const New = () => {
  const AnimateDiv = withScrollAnimation("div");
  return (
    <div className={styles.new} id="novedades">
      <AnimateDiv>
        <Title title="Novedades" color="#03495C" size="large" />
      </AnimateDiv>

      <div className={styles.imgContainer}>
        <div className={styles.desktop}>
          <img src="/img/new/img1.png" alt="" />
          <img src="/img/new/img2.png" alt="" />
          <img src="/img/new/img3.png" alt="" />
        </div>

        <Slider>
          <img src="/img/new/img1.png" alt="" />
          <img src="/img/new/img2.png" alt="" />
          <img src="/img/new/img3.png" alt="" />
        </Slider>


      </div>
    </div>
  );
};

export default New;
