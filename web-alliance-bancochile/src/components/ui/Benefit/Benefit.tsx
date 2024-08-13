import React from "react";
import styles from "./Benefit.module.scss";

interface benefitProps {
  text1?: string;
  text2?: string;
  text3?: string;
}

import benefit1 from "./images/benefit1.png";
import benefit2 from "./images/benefit2.png";
import benefit3 from "./images/benefit3.png";

const Benefit = ({ text1, text2, text3 }: benefitProps) => {
  return (
    <>
      <div className={styles.benefit}>
        <div className={styles.content}>
          <img src={`${benefit1.src}`} className={styles.img} />
          <div className={styles.textContainer}>
            <p>{text1}</p>
          </div>
        </div>
        <div className={styles.content}>
          <img src={`${benefit2.src}`} className={styles.img} />
          <div className={styles.textContainer}>
            <p>{text2}</p>
          </div>
        </div>
        <div className={styles.content}>
          <img src={`${benefit3.src}`} className={styles.img} />
          <div className={styles.textContainer}>
            <p>{text3}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Benefit;
