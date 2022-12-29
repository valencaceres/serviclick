import InputText from "../../ui/InputText";

import styles from "./ComboBox.module.scss";

type ComboBoxT = {
  id?: string;
  label?: string;
  width: string;
  value: string;
  onChange?: any;
  placeHolder?: string;
  display?: boolean;
  data: any;
  dataValue: string;
  dataText: string;
  enabled?: boolean;
};

const ComboBox = ({
  id,
  label,
  width,
  value,
  onChange,
  placeHolder,
  display = true,
  data,
  dataValue,
  dataText,
  enabled = true,
}: ComboBoxT) => {
  return enabled ? (
    <div
      className={`${styles.comboBox}${!enabled ? " " + styles.disabled : ""}`}
      style={{ width }}>
      <select
        id={id}
        disabled={!enabled}
        value={value}
        onChange={onChange}
        placeholder=" "
        className={styles.combo + (label ? "" : " " + styles.noLabel)}
        style={{ display: display ? "block" : "none" }}>
        {placeHolder && <option value="">{placeHolder}</option>}
        {data.map((item: any, idx: number) => (
          <option key={idx} value={item[dataValue]}>
            {item[dataText]}
          </option>
        ))}
      </select>
      {label && display && <label htmlFor={id}>{label}</label>}
    </div>
  ) : (
    <InputText
      label={label}
      width={width}
      value={
        data.filter((item: any) => item[dataValue] === value).length > 0
          ? data.filter((item: any) => item[dataValue] === value)[0][dataText]
          : ""
      }
      disabled={!enabled}
      onChange={onChange}
    />
  );
};

export default ComboBox;
