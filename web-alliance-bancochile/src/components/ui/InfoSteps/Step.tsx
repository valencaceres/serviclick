import React from "react";
import styles from "./Step.module.scss";

export interface StepProps {
  number: number;
  title: string;
  iconColor: string;
  boldWords?: { text: string; color: string }[];
  contactInfo?: string;
}

const Step: React.FC<StepProps> = ({
  number,
  title,
  iconColor,
  boldWords = [],
  contactInfo,
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
      <div className={styles.icon} style={{ backgroundColor: iconColor }}>
        {number}
      </div>
      <div className={styles.line}></div>
      <div className={styles.step}>
        <div className={styles.content}>
          <p dangerouslySetInnerHTML={{ __html: processText(title) }} />

          {contactInfo && (
            <p
              className={styles.contact}
              dangerouslySetInnerHTML={{ __html: processText(contactInfo) }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Step;
