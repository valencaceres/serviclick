import React from "react";

import styles from "./Title.module.scss";

interface ITitle {
  title: string;
  color: string;
  size: "small" | "medium" | "large";
}
const Title = ({ title, color, size }: ITitle) => {
  let titleSizeClass = "";
  switch (size) {
    case "small":
      titleSizeClass = styles.small;
      break;
    case "medium":
      titleSizeClass = styles.medium;
      break;
    case "large":
      titleSizeClass = styles.large;
      break;
    default:
      titleSizeClass = styles.medium;
  }
  return (
    <h2 className={`${styles.title} ${titleSizeClass}`} style={{ color }}>
      {title}
    </h2>
  );
};

export default Title;
