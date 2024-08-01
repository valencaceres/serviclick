import React from "react";
import styles from "./Benefit.module.scss";

interface benefitProps {
  img: string;
  text?: string;
  img2: string;
  text2?: string;
  img3: string;
  text3?: string;
}

const Benefit = ({ img, text, img2, text2, img3, text3 }: benefitProps) => {
  return (
    <>
      <div className={styles.benefit}>
        <div className={styles.content}>
          <img src={`${img}`} className={styles.img} />
          <div className={styles.textContainer}>
            <p>{text}</p>
          </div>
        </div>
        <div className={styles.content}>
          <img src={`${img2}`} className={styles.img} />
          <div className={styles.textContainer}>
            <p>{text2}</p>
          </div>
        </div>
        <div className={styles.content}>
          <img src={`${img3}`} className={styles.img} />
          <div className={styles.textContainer}>
            <p>{text3}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Benefit;
