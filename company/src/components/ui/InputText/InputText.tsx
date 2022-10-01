import styles from "./InputText.module.scss";

type InputTextT = {
  id?: string;
  label?: string;
  width: string;
  type?: string;
  value: string;
  onChange?: any;
  onFocus?: any;
  onBlur?: any;
  icon?: string;
  display?: boolean;
  onClick?: any;
  maxLength?: number;
  isValid?: boolean;
  disabled?: boolean;
};

const InputText = ({
  id,
  label,
  width,
  type = "text",
  value,
  onChange,
  onFocus = () => {},
  onBlur = () => {},
  icon,
  display = true,
  onClick,
  maxLength,
  isValid = true,
  disabled = false,
}: InputTextT) => {
  let iconName;

  return (
    <div className={styles.inputText} style={{ width }}>
      <input
        type={type}
        autoComplete="none"
        id={id}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder=""
        className={
          styles.input +
          (icon ? " " + styles.withIcon : "") +
          (label ? "" : " " + styles.noLabel) +
          (isValid ? "" : " " + styles.notValid)
        }
        style={{ display: display ? "block" : "none" }}
        maxLength={maxLength}
        disabled={disabled}
      />
      {label && display && <label htmlFor={id}>{label}</label>}
      {icon && display && (
        <span className="material-icons md-36">{iconName}</span>
      )}
    </div>
  );
};

export default InputText;
