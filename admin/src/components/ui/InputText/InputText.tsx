import styles from "./InputText.module.scss";

type InputTextT = {
  id?: string;
  label?: string;
  width?: string;
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
  className?: any;
  minDate?: string;
  minTime?: string;
  maxTime?: string;
  step?: string;
  timeFormat?: string;
  defaultValue?: string;
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
  className,
  minDate,
  minTime,
  maxTime,
  step,
  timeFormat,
  defaultValue,
}: InputTextT) => {
  let iconName;

  return (
    <div className={`${styles.inputText} ${className}`} style={{ width }}>
      <input
        type={type}
        autoComplete="none"
        id={id}
        value={value}
        defaultValue={defaultValue}
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
        min={minDate ? minDate : minTime}
        max={maxTime}
        step={step}
      />
      {label && display && <label htmlFor={id}>{label}</label>}
      {icon && display && (
        <span className="material-icons md-36">{iconName}</span>
      )}
    </div>
  );
};

export default InputText;
