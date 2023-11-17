import styles from "./CheckBox.module.scss";

type CheckBoxT = {
  id?: string;
  width: string;
  label: string;
  onChange: any;
  value: boolean;
};

const CheckBox = ({ width, label, onChange, value, id }: CheckBoxT) => {
  return (
    <div className={styles.checkBox} style={{ width }}>
      <input id={id} type="checkbox" checked={value} onChange={onChange} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default CheckBox;
