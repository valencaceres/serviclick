import styles from "./InputText.module.scss";

type InputTextT = {
  id?: string;
  label?: string;
  width?: string;
  type?: string;
  value: string;
  onChange?: any;
  onKeyUp?: any;
  onFocus?: any;
  onBlur?: any;
  icon?: string;
  display?: boolean;
  onClick?: any;
  maxLength?: number;
  isValid?: boolean;
  disabled?: boolean;
  className?: any;
};

const InputText = ({
  id,
  label,
  width,
  type = "text",
  value,
  onChange,
  onKeyUp = () => {},
  onFocus = () => {},
  onBlur = () => {},
  icon,
  display = true,
  onClick,
  maxLength,
  isValid = true,
  disabled = false,
  className,
}: InputTextT) => {
  let iconName;
  let formattedValue = value;

  if (type === "date" && value) {
    const parts = value.split("/");
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const year = parseInt(parts[2], 10);
      const date = new Date(year, month, day);
      if (!isNaN(date.getTime())) {
        formattedValue = date.toISOString().split("T")[0];
      }
    }
  }

  return (
    <div className={`${styles.inputText} ${className}`} style={{ width }}>
      <input
        type={type}
        autoComplete="none"
        id={id}
        value={formattedValue}
        onKeyUp={onKeyUp}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder=""
        className={
          styles.input +
          (icon ? " " + styles.withIcon : "") +
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
