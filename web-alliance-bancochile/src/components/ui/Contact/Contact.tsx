import React from "react";
import styles from "./Contact.module.scss";

import location from "./images/location.png";
import mail from "./images/mail.png";
import phone from "./images/phone.png";
import mapa from "./images/mapa.png";
import webpay from "./images/webpay.png";

const Contact = () => {
  return (
    <div className={styles.contact} id="ubicacion">
      <div className={styles.text} id="contacto">
        <h2>¡CONTÁCTANOS!</h2>
        <div className={styles.contactItem}>
          <img src={phone.src} alt="Teléfono" className={styles.icon} />
          <p>6000860580</p>
        </div>
        <div className={styles.contactItem}>
          <img src={mail.src} alt="Correo" className={styles.icon} />
          <p>comercial@serviclick.cl</p>
        </div>
        <div className={styles.contactItem}>
          <img src={location.src} alt="Dirección" className={styles.icon} />
          <p>Huerfános 669, Piso 7</p>
        </div>
      </div>
      <div className={styles.img}>
        <img src={mapa.src} className={styles.mapa} alt="Mapa" />
        <img src={webpay.src} className={styles.webpay} alt="Webpay" />
      </div>
    </div>
  );
};

export default Contact;
