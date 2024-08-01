import React from "react";
import styles from "./Step.module.scss";

export interface StepProps {
  number: number;
  title: string;
  iconColor: string;
  boldWords?: { text: string; color: string }[];
  contactInfo?: string;
  showLineVer?: boolean;
}

const Step: React.FC<StepProps> = ({
  number,
  title,
  iconColor,
  boldWords = [],
  contactInfo,
  showLineVer = false,
}) => {
  const processText = (text: string): string => {
    boldWords.forEach(({ text: word, color }) => {
      if (!word) return;

      const escapedWord = word.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
      const regex = new RegExp(`(${escapedWord})`, "gi");
      text = text.replace(
        regex,
        `<strong style="color: ${color};">$1</strong>`
      );
    });
    return text;
  };

  const reverseOrder = [1, 3].includes(number);

  return (
    <div
      className={`${styles.stepContainer} ${
        reverseOrder ? styles.reverseOrder : ""
      }`}
    >
      {showLineVer && <div className={styles.lineVer}></div>}

      <div className={styles.icon} style={{ backgroundColor: iconColor }}>
        {number}
      </div>
      <div className={styles.line}></div>
      <div className={styles.step}>
        <p dangerouslySetInnerHTML={{ __html: processText(title) }} />
      </div>
    </div>
  );
};

export default Step;
