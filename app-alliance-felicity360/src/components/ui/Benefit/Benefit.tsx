import React from "react";
import styles from "./Benefit.module.scss";

interface benefitProps {
  img: string;
  text?: string;
  textTwo?: string;
}

const Benefit = ({ img, text, textTwo }: benefitProps) => {
  return (
    <div className={styles.content}>
      <img src={`${img}`} className={styles.img} />
      <div className={styles.textContainer}>
        <p>{text}</p>
        <span>{textTwo}</span>
      </div>
    </div>
  );
};

export default Benefit;
