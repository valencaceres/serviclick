"use client";
import React, { useState } from "react";
import styles from "./Header.module.scss";
import Title from "../Title";
import Chat from "../Chat";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} ${isOpen ? styles.open : ""}`}>
        <div className={styles.menuButtonContainer}>
          {!isOpen && (
            <div className={styles.rightButton}>
              <button>Habla con nosotros</button>
            </div>
          )}
          <div className={styles.menuToggle} onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <a href="#asistencias">Asistencias</a>
          </li>
          <li className={styles.navItem}>
            <a href="#ubicacion">Ubicación</a>
          </li>
          <li className={styles.navItem}>
            <a href="#contacto">Contacto</a>
          </li>

          {isOpen && (
            <li className={styles.navItem}>
              <div className={styles.chatContainer}>
                <Chat />
              </div>
            </li>
          )}
        </ul>
      </nav>

      <div className={styles.background}>
        <div className={styles.textContainer}>
          <div>
            <Title
              title="Asistencias que <br/> facilitan tu vida "
              boldWords={["Asistencias"]}
              color="#03495C"
              textAlign="left"
              size="large"
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
