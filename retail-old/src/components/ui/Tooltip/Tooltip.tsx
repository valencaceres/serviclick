import { useState, useEffect } from "react";

import styles from "./Tooltip.module.scss";

const Tooltip = ({ isShow, onClose, children }: any) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShow(isShow);
    }, 500);
  }, [isShow]);

  return (
    <div
      className={styles.tooltip + " " + `${show ? styles.show : styles.hide}`}
    >
      <div className={styles.closeTooltip}>
        <span className="material-icons md-36" onClick={onClose}>
          close
        </span>
      </div>
      <div className={styles.contentTooltip}>{children}</div>
    </div>
  );
};

export default Tooltip;
