import React from "react";

import styles from "./CardAboutUs.module.scss";

interface ICardAboutUs {
  img: string;
  title: string;
  paragraph: string;
  width: string;
  height: string;
}
const CardAboutUs = ({
  img,
  title,
  paragraph,
  width,
  height,
}: ICardAboutUs) => {
  return (
    <div className={styles.cardAboutUs}>
      <img
        className={styles.img}
        src={`${img}`}
        style={{
          width: "100%",
          height: `calc(100wv * ${height} / ${width})`,
        }}
      />
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.paragraph}>{paragraph}</p>
    </div>
  );
};

export default CardAboutUs;
