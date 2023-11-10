import styles from "./ButtonIcon.module.scss";

import Icon from "../Icon";

type ButtonIconT = {
  onClick?: any;
  iconName: string;
  disabled?: boolean;
  loading?: boolean;
  color?: string;
};

const ButtonIcon = ({
  onClick,
  iconName,
  disabled = false,
  loading = false,
  color = "green",
}: ButtonIconT) => {
  return (
    <button
      className={
        loading
          ? styles.button + " " + styles.spin
          : styles.button + " " + styles[color]
      }
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
