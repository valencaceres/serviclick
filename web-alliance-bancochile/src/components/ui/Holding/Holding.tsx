import React from "react";
import styles from "./Holding.module.scss";

const Holding: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1>Serviclick es parte de MHM Empresas</h1>
      <div className={styles.pyramidContainer}>
        <img
          src="/img/holding/empresa.png"
          alt="MHM Empresas Logo"
          className={styles.mainLogo}
        />
        <div className={styles.rowOne}>
          <img src="/img/holding/mhm.png" alt="MHM Corredora de Seguros" />
          <img src="/img/holding/serviclick.png" alt="Servi.click" />
        </div>
        <div className={styles.rowTwo}>
          <img src="/img/holding/trade.png" alt="Servi.Trade" />
          <img src="/img/holding/assist.png" alt="Pro.Assist" />
          <img src="/img/holding/call.png" alt="Pro.Call" />
          <img src="/img/holding/defensa.png" alt="Pro.Defensa" />
        </div>
      </div>
    </div>
  );
};

export default Holding;
