import React from "react";

import styles from "./New.module.scss";

import Title from "@/components/ui/Title";

import withScrollAnimation from "@/components/ui/Framer";

interface INew {
  img: string;
  img2: string;
  img3: string;
  height: string;
  width: string;
}
const New = ({ img, img2, img3, height, width }: INew) => {
  const AnimateDiv = withScrollAnimation("div");
  return (
    <div className={styles.new} id="novedades">
      <AnimateDiv>
        <Title title="Novedades" color="#03495C" size="large" />
      </AnimateDiv>

      <div className={styles.imgContainer}>
        <div className={styles.img}>
        <img
          src={`${img}`}
          style={{
            width: "100%",
            height: `calc(100% * ${height} / ${width})`,
          }}
        />
        </div>
        <div className={styles.img}>
        <img
          src={`${img2}`}
          style={{
            width: "100%",
            height: `calc(100% * ${height} / ${width})`,
          }}
        />
        </div>
        <div className={styles.img}>
        <img
          src={`${img3}`}
          style={{
            width: "100%",
            height: `calc(100% * ${height} / ${width})`,
          }}
        />
        </div>
       
      </div>
    </div>
  );
};

export default New;
