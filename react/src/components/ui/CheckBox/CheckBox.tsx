import styles from "./CheckBox.module.scss";

type CheckBoxT = {
  width: string;
  label: string;
  onChange: any;
  value: boolean;
};

const CheckBox = ({ width, label, onChange, value }: CheckBoxT) => {
  return (
    <div className={styles.checkBox} style={{ width }}>
      <input type="checkbox" checked={value} onChange={onChange} />
      <label>{label}</label>
    </div>
  );
};

export default CheckBox;
