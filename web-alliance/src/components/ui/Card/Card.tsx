import React from "react";

import styles from "./Card.module.scss";

const Card = ({ children }: any) => {
  return <div className={styles.card}>{children}</div>;
};

export default Card;
