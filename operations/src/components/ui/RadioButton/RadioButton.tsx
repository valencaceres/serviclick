import React from "react";

import styles from "./RadioButton.module.scss";

interface IRadioButtonGroup {
  label: string;
  children: React.ReactNode;
  width?: string;
  height?: string;
  enabled?: boolean;
}

interface IRadioButtonItem {
  checked: boolean;
  onChange: (e: React.FocusEvent<HTMLInputElement>) => void;
  label: string;
  name: string;
  value: string;
  disabled?: boolean;
}

const RadioButtonGroup = ({
  children,
  label,
  width,
  height,
}: IRadioButtonGroup) => {
  return (
    <div className={styles.radioButton} style={{ width, height }}>
      <p className={styles.labelGroup}>{label}</p>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

const RadioButtonItem = ({
  checked,
  onChange,
  label,
  name,
  value,
  disabled = true,
}: IRadioButtonItem) => {
  return (
    <label className={styles.radio}>
      <input
        name={name}
        type="radio"
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <span className={styles.label}>{label}</span>
    </label>
  );
};
export { RadioButtonGroup, RadioButtonItem };
