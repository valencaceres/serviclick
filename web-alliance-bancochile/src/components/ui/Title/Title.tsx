import React from "react";
import styles from "./Title.module.scss";

interface TitleProps {
  title: string;
  boldWords?: string[];
  color?: string;
  size?: "small" | "medium" | "large";
  textAlign?: "left" | "center" | "right" | "justify";
  className?: string;
}

const Title: React.FC<TitleProps> = ({
  title,
  boldWords = [],
  color = "black",
  size = "medium",
  textAlign = "left",
  className = "",
}) => {
  const escapeRegExp = (string: string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  };

  const processTitle = (title: string): string => {
    boldWords.forEach((word) => {
      const escapedWord = escapeRegExp(word);

      const regex = new RegExp(escapedWord.replace(/\s+/g, "\\s*"), "gi");
      title = title.replace(
        regex,
        `<span class="${styles.bold}" style="color: ${color};">$&</span>`
      );
    });
    return title;
  };

  const htmlContent = processTitle(title);

  return (
    <p
      className={`${styles.title} ${styles[`size-${size}`]} ${className}`}
      style={{ textAlign }}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

export default Title;
