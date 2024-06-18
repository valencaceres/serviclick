import React from 'react';
import styles from "./Holding.module.scss";

const Holding = () => {
    return (
        <div className={styles.holdingContainer}>
            <div className={styles.line}>
                <h2>Serviclick es parte de</h2>
                <div className={styles.rowOne}>
                    <img src="/img/holding/empresa.png" className={styles.img} alt="Empresa" />
                </div>
                <div className={styles.rowTwo}>
                    <img src="/img/holding/mhm.png" className={styles.img} alt="MHM" />
                    <img src="/img/holding/serviclick.png" className={styles.img} alt="Serviclick" />
                </div>
                <div className={styles.rowThree}>
                    <img src="/img/holding/trade.png" className={styles.img} alt="Trade" />
                    <img src="/img/holding/assist.png" className={styles.img} alt="Assist" />
                    <img src="/img/holding/call.png" className={styles.img} alt="Call" />
                    <img src="/img/holding/defensa.png" className={styles.img} alt="Defensa" />
                </div>
            </div>
        </div>
    );
}

export default Holding;
