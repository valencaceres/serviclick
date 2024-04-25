import React from "react";
import styles from "./ContactForm.module.scss";
import Icon from "../Icon";
import TextBox from "../TextBox";

interface ContactFormProps {
  onClose: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onClose }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.formContainer}>
        <div className={styles.head}>
          <div className={styles.closeIcon} onClick={onClose}>
            <Icon icon="close" color="#000000" />
          </div>
        </div>

        <div className={styles.form}>
          <h2>Contáctanos</h2>

          <TextBox label="Nombre" text="Escribe tu nombre aquí" />
          <TextBox label="Email" text="Escribe tu email" />
          <TextBox label="Teléfono" text="Escribe tu teléfno" />
          <TextBox
            label="Nombre de la empresa"
            text="Escribe el nombre de tu empresa aquí"
          />
          <button type="submit">Aceptar</button>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
