import styles from "./InputText.module.scss";

type InputT = {
  id?: string;
  label?: string;
  width?: string;
  type?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  icon?: string;
  display?: boolean;
  maxLength?: number;
  isValid?: boolean;
  disabled?: boolean;
  className?: string;
  minDate?: string;
  minTime?: string;
  maxTime?: string;
  step?: string;
  defaultValue?: string;
};

const InputText = ({
  id,
  label,
  width,
  type = "text",
  value,
  onChange,
  icon,
  display = true,
  maxLength,
  isValid = true,
  disabled = false,
  className,
  minDate,
  minTime,
  maxTime,
  step,
  defaultValue,
}: InputT) => {
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
