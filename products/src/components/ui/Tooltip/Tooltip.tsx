import React from "react";
import classNames from "classnames";

import styles from "./Tooltip.module.scss";
import { useState } from "react";

const Tooltip = ({ children }: any) => {
  const [isClosed, setIsClosed] = useState(false);

  const tooltipClass = classNames(
    styles.tooltip,
    styles.animated,
    !isClosed ? styles.bounceInLeft : styles.bounceOutLeft
  );

  return (
    <div className={tooltipClass}>
      <span
        className="material-symbols-outlined"
        onClick={() => setIsClosed(true)}>
        close
      </span>
      <div className={styles.contain}>{children}</div>
    </div>
  );
};

export default Tooltip;
