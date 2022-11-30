import styles from "./TextArea.module.scss";

type TextAreaT = {
  id?: string;
  label?: string;
  width?: string;
  height?: string;
  value: string;
  onChange?: any;
  onFocus?: any;
  onBlur?: any;
  display?: boolean;
  maxLength?: number;
  isValid?: boolean;
  disabled?: boolean;
  className?: any;
};

const TextArea = ({
  id,
  label,
  width,
  height,
  value,
  onChange,
  onFocus = () => {},
  onBlur = () => {},
  display = true,
  maxLength,
  isValid = true,
  disabled = false,
  className,
}: TextAreaT) => {
  return (
    <div className={`${styles.textArea} ${className}`} style={{ width }}>
      <textarea
        autoComplete="none"
        id={id}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder=""
        className={styles.input + (isValid ? "" : " " + styles.notValid)}
        style={{
          display: display ? "block" : "none",
          height,
          textAlign: "justify",
        }}
        maxLength={maxLength}
        disabled={disabled}
      />
      {label && display && <label htmlFor={id}>{label}</label>}
    </div>
  );
};

export default TextArea;
