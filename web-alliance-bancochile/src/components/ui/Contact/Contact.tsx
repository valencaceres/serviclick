import React from "react";

import styles from "./Contact.module.scss";

const Contact = () => {
  return (
    <div className={styles.content}>
      <div className={styles.text}>
        <h2>Contacto </h2>
        <p>6000860580</p>
        <p>comercial@serviclick.cl</p>
        <a href="https://www.google.cl/maps/place/Enrique+Mac+Iver+440,+oficina+702,+8320123+Santiago,+Regi%C3%B3n+Metropolitana/@-33.4374811,-70.6473985,17z/data=!3m1!4b1!4m6!3m5!1s0x9662c5a2593b4d79:0xefa90de0cacfe9fc!8m2!3d-33.4374811!4d-70.6473985!16s%2Fg%2F11rd_mkblx?entry=ttu">
          Enrique Mac Iver 440 Oficina 702
        </a>
      </div>

      <img src="img/contact/mapa.png" alt="" />
      <img src="img/contact/webpay.png" alt="" />
    </div>
  );
};

export default Contact;
