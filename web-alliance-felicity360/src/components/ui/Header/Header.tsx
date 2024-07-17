import React from "react";

import styles from "./Header.module.scss";

interface HeaderProps {
  backgroundColor?: string;
}
const Header = ({ backgroundColor = "transparent" }: HeaderProps) => {
  return (
    <div className={styles.header} style={{ backgroundColor }}>
      <picture>
        <source media="(max-width: 768px)" srcSet="/img/logo/serviclick_mobile.png" />
        <img 
          src="/img/logo/serviclick.png" 
          alt="Serviclick" 
          className={styles.logo} 
        />
      </picture>
      <img src="/img/logo/logo-felicity-white.png" alt="" />
    </div>
  );
};

export default Header;
