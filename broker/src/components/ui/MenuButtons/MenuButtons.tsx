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

const MenuItemPrice = ({ text, prices, onClickPrice1, onClickPrice2 }: any) => {
  return (
    <div className={styles.menuItemPrice}>
      <div className={styles.text}>{text}</div>
      <div className={styles.prices}>
        <div className={styles.priceLeft} onClick={onClickPrice1}>
          Individual
          <br />$ {prices[0].toLocaleString("en-US").replace(",", ".")}
        </div>
        <div className={styles.priceRight} onClick={onClickPrice2}>
          Empresa
          <br />$ {prices[1].toLocaleString("en-US").replace(",", ".")}
        </div>
      </div>
    </div>
  );
};

export { MenuButtons, MenuItem, MenuItemPrice };
