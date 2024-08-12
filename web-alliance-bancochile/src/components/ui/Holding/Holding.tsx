import React from "react";
import styles from "./Holding.module.scss";

import empresa from "./images/empresa.png";
import mhm from "./images/mhm.png";
import serviclick from "./images/serviclick.png";
import trade from "./images/trade.png";
import assist from "./images/assist.png";
import call from "./images/call.png";
import defensa from "./images/defensa.png";

const Holding: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1>Serviclick es parte de MHM Empresas</h1>
      <div className={styles.pyramidContainer}>
        <img
          src={empresa.src}
          alt="MHM Empresas Logo"
          className={styles.mainLogo}
        />
        <div className={styles.rowOne}>
          <img src={mhm.src} alt="MHM Corredora de Seguros" />
          <img src={serviclick.src} alt="Servi.click" />
        </div>
        <div className={styles.rowTwo}>
          <img src={trade.src} alt="Servi.Trade" />
          <img src={assist.src} alt="Pro.Assist" />
          <img src={call.src} alt="Pro.Call" />
          <img src={defensa.src} alt="Pro.Defensa" />
        </div>
      </div>
    </div>
  );
};

export default Holding;
