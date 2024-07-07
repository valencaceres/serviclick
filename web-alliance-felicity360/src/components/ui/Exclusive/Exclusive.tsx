import React from "react";

import styles from "./Exclusive.module.scss";

const Exclusive = () => {
  return (
    <div className={styles.content}>
      <h2>BENEFICIO EXCLUSIVO CON:</h2>
      <img src="/img/exclusive/logo.png" alt="" />
    </div>
  );
};

export default Exclusive;
