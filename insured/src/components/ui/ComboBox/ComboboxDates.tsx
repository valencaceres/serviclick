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
  dataValue: string; // Ahora se espera que dataValue contenga tanto el mes como el año
  dataText: string;
  enabled?: boolean;
  currency?: string;
};

const ComboboxDates = ({
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
  const getPropertyByPath = (obj: any, path: string) => {
    return path.split(".").reduce((acc, part) => acc && acc[part], obj);
  };

  return (
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
          <option key={idx} value={`${getPropertyByPath(item, "month")} ${getPropertyByPath(item, "year")}`}>
            {`${getPropertyByPath(item, "month")} ${getPropertyByPath(item, "year")}`}
          </option>
        ))}
      </select>
      {label && display && <label htmlFor={id}>{label}</label>}
    </div>
  );
};

export default ComboboxDates;