import React, { FC } from "react";

interface IProps {
  title: string;
  width?: string;
}

import styles from "./Section.module.scss";

const Section: FC<IProps> = ({ title, width }) => {
  return (
    <div className={styles.section} style={{ width }}>
      {title}
    </div>
  );
};

export default Section;
