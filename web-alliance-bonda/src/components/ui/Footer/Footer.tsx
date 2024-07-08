import React from "react";

import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.text}>
        <div className={styles.col}>
          <p>Términos y condiciones </p>
          <p>Trabaja con nosotros </p>
          <p>Contacto Empresas </p>
          <p>Contacto Comercial </p>
        </div>
        <div className={styles.col}>
          <p>Asistencia Salud Universal</p>
          <p>Asistencia Salud Joven</p>
          <p>Asistencia Mascotas</p>
          <p>Asistencia Hogar</p>
        </div>
        <div className={styles.col}>
          <p>Asistencia Total Ultra</p>
          <p>Asistencia Vehicular</p>
          <p>Asistencia al Ciclista</p>
        </div>
      </div>

      <img src="/img/footer/logo.png" alt="" />
    </div>
  );
};

export default Footer;
