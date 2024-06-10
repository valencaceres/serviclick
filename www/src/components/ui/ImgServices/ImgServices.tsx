import React, { useState } from "react";
import styles from "./ImgServices.module.scss";

interface ImgServicesProps {
  imageUrl: string;
  buttonText: string;
  children: React.ReactNode;
}

const ImgServices: React.FC<ImgServicesProps> = ({ imageUrl, buttonText, children }) => {
  const [showInfo, setShowInfo] = useState(false);

  const handleToggleInfo = () => {
    setShowInfo(!showInfo);
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.background}
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        {!showInfo && (
          <button className={styles.button} onClick={handleToggleInfo}>
            {buttonText}
          </button>
        )}
        {showInfo && (
          <div className={styles.info}>
            <button className={styles.closeButton} onClick={handleToggleInfo}>
              &times;
            </button>
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImgServices;
