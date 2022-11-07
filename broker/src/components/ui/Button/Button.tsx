import { Fragment } from "react";

import styles from "./Button.module.scss";

const Button = ({
  text,
  onClick,
  iconName,
  width,
  enabled = true,
  loading = false,
  color = "green",
}: any) => {
  return (
    <button
      className={
        loading
          ? styles.button + " " + styles.spin
          : styles.button + " " + styles[color]
      }
      onClick={onClick}
      disabled={!enabled || loading}
      style={{ width }}>
      <Fragment>
        {iconName && <span className="material-icons md-36">{iconName}</span>}
        {loading ? (
          <Fragment>
            <div className={styles.spin}>
              <span
                className={`material-symbols-outlined`}
                style={{ color: "white" }}>
                refresh
              </span>
            </div>
            Espere...
          </Fragment>
        ) : (
          text
        )}
      </Fragment>
    </button>
  );
};

export default Button;
