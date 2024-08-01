import React from "react";
import styles from "./Exclusive.module.scss";
import Title from "../Title";
const Exclusive = () => {
  return (
    <div className={styles.exclusive}>
      {" "}
      <Title
        title="Beneficio Exclusivo con:"
        color="#03495C"
        size="medium"
        textAlign="center"
        className={styles.customTitle}
      />
      <img src="/img/icons/cards.png" alt="" />
    </div>
  );
};

export default Exclusive;
