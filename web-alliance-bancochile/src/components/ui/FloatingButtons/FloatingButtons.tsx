import React from "react";
import styles from "./FloatingButtons.module.scss";

interface FloatingButtonsProps {
  img: string;
  img2: string;
  href1: string;
  href2: string;
}

const FloatingButtons: React.FC<FloatingButtonsProps> = ({
  img,
  img2,
  href1,
  href2,
}) => {
  return (
    <div className={styles.floatingButtonsContainer}>
      <a
        href={href1}
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.buttonLink}`}
      >
        <div className={styles.button}>
          <img src={img} alt="Button 1" />
        </div>
      </a>
      <a
        href={href2}
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.button2Link}`}
      >
        <div className={styles.button2}>
          <img src={img2} alt="Button 2" />
        </div>
      </a>
    </div>
  );
};

export default FloatingButtons;
