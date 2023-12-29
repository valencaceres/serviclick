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
  currency?: string;
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
  currency,
}: ComboBoxT) => {
  const getPropertyByPath = (obj: any, path: string) => {
    return path.split(".").reduce((acc, part) => acc && acc[part], obj);
  };

  return enabled ? (
    <div
      className={`${styles.comboBox}${!enabled ? " " + styles.disabled : ""}`}
      style={{ width }}
    >
      <select
        id={id}
        disabled={!enabled}
        value={value}
        onChange={onChange}
        className={styles.combo + (label ? "" : " " + styles.noLabel)}
        style={{ display: display ? "block" : "none" }}
      >
        {placeHolder && <option value="">{placeHolder}</option>}
        {data?.map((item: any, idx: number) => (
          <option key={idx} value={getPropertyByPath(item, dataValue)}>
            {getPropertyByPath(item, dataText)}
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
        data?.filter(
          (item: any) => getPropertyByPath(item, dataValue) === value
        ).length > 0
          ? getPropertyByPath(
              data?.filter(
                (item: any) => getPropertyByPath(item, dataValue) === value
              )[0],
              dataText
            )
          : ""
      }
      disabled={!enabled}
      onChange={onChange}
    />
  );
};

export default ComboBox;
