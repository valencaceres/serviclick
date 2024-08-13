import { Fragment } from "react";

import styles from "./Button.module.scss";

const Button = ({
  text,
  type = "form",
  onClick,
  width,
  enabled = true,
  loading = false,
}: any) => {
  return (
    <button
      className={styles.button}
      onClick={onClick}
      disabled={!enabled || loading}
      style={{
        //width,
        //height: type === "form" ? "40px" : "30px",
        backgroundColor: type === "form" ? "#15495d" : "#B4CD25",
      }}>
      <Fragment>
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
