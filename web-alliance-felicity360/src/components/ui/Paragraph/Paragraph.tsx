import React from "react";
import styles from "./Paragraph.module.scss";

interface WordStyle {
  word: string;
  color: string;
  fontWeight?: string;
}

interface ParagraphProps {
  content: string;
  wordsWithStyles?: WordStyle[];
}

const Paragraph: React.FC<ParagraphProps> = ({
  content,
  wordsWithStyles = [],
}) => {
  const words = content.split(" ");

  return (
    <div className={styles.paragraph}>
      <p className={styles.content}>
        {words.map((word, index) => {
          const wordWithStyle = wordsWithStyles.find((ws) => ws.word === word);

          return (
            <span
              key={index}
              style={{
                color: wordWithStyle ? wordWithStyle.color : "inherit",
                fontWeight: wordWithStyle
                  ? wordWithStyle.fontWeight || "medium"
                  : "medium",
              }}
            >
              {word}
              {index < words.length - 1 && " "}
            </span>
          );
        })}
      </p>
    </div>
  );
};

export default Paragraph;
