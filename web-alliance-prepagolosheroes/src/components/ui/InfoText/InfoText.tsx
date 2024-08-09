import styles from "./InfoText.module.scss";

const InfoText = ({ label, width = "100%", value }: any) => {
  return (
    <div className={styles.info} style={{ width }}>
      <label>{label}</label>
      <div>{value}</div>
    </div>
  );
};

export default InfoText;
