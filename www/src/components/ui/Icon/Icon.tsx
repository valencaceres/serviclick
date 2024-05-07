import React from "react";
import styles from "./Icon.module.scss";
interface IIcon {
  icon: string;
  color: string;
  onClick?: () => void;
}

const Icon = ({ icon, color, onClick }: IIcon) => {
  return (
    <div className={styles.icon}>
      <span
        className="material-symbols-outlined"
        onClick={onClick}
        style={{ color }}
      >
        {icon}
      </span>
    </div>
  );
};

export default Icon;
