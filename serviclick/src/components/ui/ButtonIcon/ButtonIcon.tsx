import styles from "./ButtonIcon.module.scss";

import Icon from "../Icon";

const ButtonIcon = ({
  onClick,
  iconName,
  disabled = false,
  loading = false,
}: any) => {
  return (
    <button
      className={loading ? styles.button + " " + styles.spin : styles.button}
      onClick={onClick}
      disabled={disabled || loading}>
      {loading ? (
        <span
          className={`material-symbols-outlined`}
          style={{ color: "black" }}>
          refresh
        </span>
      ) : (
        <Icon iconName={iconName} />
      )}
    </button>
  );
};

export default ButtonIcon;
