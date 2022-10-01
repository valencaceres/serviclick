import React from "react";

import styles from "./MenuButtons.module.scss";

const MenuButtons = ({ children }: any) => {
  return <div className={styles.menuButtons}>{children}</div>;
};

const MenuItem = ({ children }: any) => {
  return <button className={styles.menuItem}>{children}</button>;
};

export { MenuButtons, MenuItem };
