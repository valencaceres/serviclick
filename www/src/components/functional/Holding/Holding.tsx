import React from "react";

import styles from "./Holding.module.scss";

import Logo from "@/components/ui/Logo";

const Holding = () => {
  return (
    <div className={styles.holding}>
      <div className={styles.line}>
        <div className={styles.rowOne}>
          <Logo
            thirdImg="/img/holding/empresa.png"
            img="/img/holding/empresa.png"
            thirdImgWidth="493px"
            width="493px"
            thirdImgHeight="124px"
            height="124px"
          />
        </div>
        <div className={styles.rowTwo}>
          <Logo
            img="/img/holding/mhm.png"
            width="439px"
            height="53px"
            thirdImg="/img/holding/mhm.png"
            thirdImgWidth="439px"
            thirdImgHeight="53px"
          />

          <Logo
            thirdImg="/img/holding/serviclick.png"
            img="/img/holding/serviclick.png"
            thirdImgWidth="439px"
            width="439px"
            thirdImgHeight="53px"
            height="53px"
          />
        </div>
        <div className={styles.rowThree}>
          <Logo
            thirdImg="/img/holding/trade.png"
            img="/img/holding/trade.png"
            width="498px"
            height="53px"
            thirdImgWidth="498px"
            thirdImgHeight="53px"
          />

          <Logo
            thirdImg="/img/holding/assist.png"
            img="/img/holding/assist.png"
            width="498px"
            height="53px"
            thirdImgWidth="498px"
            thirdImgHeight="53px"
          />

          <Logo
            thirdImg="/img/holding/call.png"
            img="/img/holding/call.png"
            width="498px"
            height="53px"
            thirdImgWidth="498px"
            thirdImgHeight="53px"
          />

          <Logo
            thirdImg="/img/holding/defensa.png"
            img="/img/holding/defensa.png"
            width="498px"
            height="53px"
            thirdImgWidth="498px"
            thirdImgHeight="53px"
          />
        </div>
      </div>
    </div>
  );
};

export default Holding;
