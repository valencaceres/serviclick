import React from "react";

import styles from "./Header.module.scss";

interface HeaderProps {
  backgroundColor?: string;
}
const Header = ({ backgroundColor = "transparent" }: HeaderProps) => {
  return (
    <div className={styles.header} style={{ backgroundColor }}>
      <img src="/img/logo/serviclick.png" alt="" />
      <img src="/img/logo/logo-bonda.png" alt="" />
    </div>
  );
};

export default Header;
