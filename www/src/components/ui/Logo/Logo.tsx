import React from "react";

import styles from "./Logo.module.scss";


interface Ilogo {
  img?: string;
  width?: string;
  height?: string;
  secondImg?: string;
  secondImgWidth?: string;
  secondImgHeight?: string;
  thirdImg?: string;
  thirdImgWidth?: string;
  thirdImgHeight?: string;
}
const Logo = ({
  img,
  width,
  height,
  secondImg,
  secondImgWidth,
  secondImgHeight,
  thirdImg,
  thirdImgWidth,
  thirdImgHeight,
}: Ilogo) => {
  return (
    <div className={styles.container}>
      <img
        src={`${img}`}
        className={styles.logo}
        style={{
          width: "100%",
          height: `calc(100vw * ${height} / ${width})`,
        }}
      />

      {secondImg && (
        <img
          src={`${secondImg}`}
          className={styles.secondImg}
          style={{
            width: "100%",
            height: `calc(100vw * ${secondImgHeight} / ${secondImgWidth})`,
          }}
          alt=""
        />
      )}

      {thirdImg && (
        <img
          src={`${thirdImg}`}
          className={styles.thirdImg}
          style={{
            width: "100%",
            height: `calc(100vw * ${thirdImgHeight} / ${thirdImgWidth})`,
          }}
          alt=""
        />
      )}
    </div>
  );
};

export default Logo;
