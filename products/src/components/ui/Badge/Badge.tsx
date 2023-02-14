import React from "react";

import styles from "./Badge.module.scss";

const Badge = ({ children }: any) => {
  return <div className={styles.bundle}>{children}</div>;
};

export default Badge;
