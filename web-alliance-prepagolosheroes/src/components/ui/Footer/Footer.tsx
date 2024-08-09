import Icon from "../Icon";

import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.columnLeft}>
          <div className={styles.address}>
            <div className={styles.data}>
              <Icon iconName="location_on"></Icon>
              <a href="https://goo.gl/maps/YLyrpsccKryUEqfs5">
                Huérfanos 669, piso 7
              </a>
            </div>
            <div className={styles.data}>
              <Icon iconName="phone"></Icon>
              <a href="tel:6000860580">600 0860 580</a>
            </div>
            <div className={styles.data}>
              <Icon iconName="email"></Icon>
              <a href="mailto:@info@serviclick.cl">info@serviclick.cl</a>
            </div>
          </div>
          <div className={styles.rrss}>
            <a
              href="https://www.facebook.com/serviclick.cl"
              target="_blank"
              rel="noreferrer">
              <div className={styles.facebook}></div>
            </a>
            <a
              href="https://www.instagram.com/serviclick.cl/"
              target="_blank"
              rel="noreferrer">
              <div className={styles.instagram}></div>
            </a>
            <a
              href="https://www.linkedin.com/company/serviclick/"
              target="_blank"
              rel="noreferrer">
              <div className={styles.linkedin}></div>
            </a>
          </div>
        </div>
        <div className={styles.columnCenter}>
          <a
            href="https://serviclick.cl/salud/"
            target="_blank"
            rel="noreferrer">
            Planes Salud
          </a>
          <a
            href="https://serviclick.cl/asistencia-hogar/"
            target="_blank"
            rel="noreferrer">
            Planes Hogar
          </a>
          <a
            href="https://serviclick.cl/asistencia-automovil/"
            target="_blank"
            rel="noreferrer">
            Plan Automóvil
          </a>
          <a
            href="https://serviclick.cl/asistencia-veterinaria/"
            target="_blank"
            rel="noreferrer">
            Planes Veterinaria
          </a>
          <a
            href="https://serviclick.cl/proteccion-total-ultra/"
            target="_blank"
            rel="noreferrer">
            Plan Protección Total Ultra
          </a>
        </div>
        <div className={styles.columnRight}>
          <a
            href="https://serviclick.cl/personas/"
            target="_blank"
            rel="noreferrer">
            Personas
          </a>
          <a
            href="https://serviclick.cl/empresas/"
            target="_blank"
            rel="noreferrer">
            Empresas
          </a>
          <a
            href="https://asegurado.serviclick.cl/"
            target="_blank"
            rel="noreferrer">
            Acceso Beneficiario
          </a>
          <a
            href="https://serviclick.cl/terminos-y-condiciones/"
            target="_blank"
            rel="noreferrer">
            Términos y condiciones
          </a>
          <a
            href="https://serviclick.cl/canales-comerciales/"
            target="_blank"
            rel="noreferrer">
            Trabaja con nosotros
          </a>
        </div>
      </div>
      <div className={styles.bottom}>
        Serviclick 2024 - Todos los derechos reservados
      </div>
    </div>
  );
};

export default Footer;
