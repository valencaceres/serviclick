import React from "react";
import Icon from "@/components/ui/Icon";

import styles from "./Info.module.scss";

const Info = ({ iconName, text }: any) => {
  return (
    <div className={styles.info}>
      <Icon iconName={iconName} />
      <p>{text}</p>
    </div>
  );
};

export default Info;
