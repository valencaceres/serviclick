import React from "react";

import styles from "./MenuButtons.module.scss";

const MenuButtons = ({ children }: any) => {
  return (
    <div className={styles.menuButtons}>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

const MenuItem = ({ children, onClick }: any) => {
  return (
    <button className={styles.menuItem} onClick={onClick}>
      {children}
    </button>
  );
};

export { MenuButtons, MenuItem };
