import React from "react";

import styles from "./Text.module.scss";
interface IText {
  text: string;
  fontSize: string;
  color: string;
}
const Text = ({ text, fontSize, color }: IText) => {
  return (
    <div className={styles.text}>
      <p className={styles.textParagraph} style={{ fontSize, color }}>
        {text}
      </p>
    </div>
  );
};

const TextStart = ({ text, fontSize, color }: IText) => {
  return (
    <div className={styles.textStart}>
      <p className={styles.textParagraph} style={{ fontSize, color }}>
        {text}
      </p>
    </div>
  );
};

export { Text, TextStart };
