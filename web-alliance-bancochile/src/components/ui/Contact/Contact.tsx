import React from "react";
import styles from "./Contact.module.scss";

const Contact = () => {
  return (
    <div className={styles.contact}>
      <div className={styles.text}>
        <h2>¡CONTÁCTANOS!</h2>
        <div className={styles.contactItem}>
          <img
            src="img/contact/phone.png"
            alt="Teléfono"
            className={styles.icon}
          />
          <p>6000860580</p>
        </div>
        <div className={styles.contactItem}>
          <img
            src="img/contact/mail.png"
            alt="Correo"
            className={styles.icon}
          />
          <p>comercial@serviclick.cl</p>
        </div>
        <div className={styles.contactItem}>
          <img
            src="img/contact/location.png"
            alt="Dirección"
            className={styles.icon}
          />
          <p>Huerfános 669, Piso 7</p>
        </div>
      </div>
      <div className={styles.img}>
        <img src="img/contact/mapa.png" className={styles.mapa} alt="Mapa" />
        <img
          src="img/contact/webpay.png"
          className={styles.webpay}
          alt="Webpay"
        />
      </div>
    </div>
  );
};

export default Contact;
