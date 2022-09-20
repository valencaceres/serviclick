import styles from "./ButtonIcon.module.scss";

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
      disabled={disabled || loading}
    >
      {loading ? (
        <span
          className={`material-symbols-outlined`}
          style={{ color: "black" }}
        >
          refresh
        </span>
      ) : (
        <span
          className="material-symbols-outlined"
          style={{ color: "white", fontWeight: 300 }}
        >
          {iconName}
        </span>
      )}
    </button>
  );
};

export default ButtonIcon;
