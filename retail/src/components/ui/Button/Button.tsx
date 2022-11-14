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
      className={loading ? styles.button : styles.button + " " + styles[color]}
      onClick={onClick}
      disabled={!enabled || loading}
      style={{ width }}>
      <Fragment>
        {iconName && <span className="material-icons md-36">{iconName}</span>}
        {loading ? (
          <Fragment>
            <div>
              <span
                className={`material-symbols-outlined ${styles.spin}`}
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
