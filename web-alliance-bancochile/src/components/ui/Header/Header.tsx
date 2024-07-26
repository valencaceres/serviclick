"use client";
import React, { useState } from "react";
import styles from "./Header.module.scss";
import Title from "../Title";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} ${isOpen ? styles.open : ""}`}>
        <div className={styles.menuToggle} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <a href="#asistencias">Asistencias</a>
          </li>
          <li className={styles.navItem}>
            <a href="#ubicación">Ubicación</a>
          </li>
          <li className={styles.navItem}>
            <a href="#contacto">Contacto</a>
          </li>
        </ul>
        <div className={styles.rightButton}>
          <button>Habla con nosotros</button>
        </div>
      </nav>

      <div className={styles.background}>
        <div className={styles.textContainer}>
          <div>
            <Title
              title="Asistencias que <br/> facilitan tu vida "
              boldWords={["Asistencias"]}
              color="#03495C"
              fontSize="60px"
              textAlign="left"
              className={styles.title}
            />
          </div>
          <div className={styles.images}>
            <img src="/img/header/serviclick.png" alt="" />
            <div className={styles.line}></div>
            <img src="/img/header/banco.png" alt="" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
