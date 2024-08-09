import styles from "./Summary.module.scss";

const Summary = ({ children, color = "#959595" }: any) => {
  return (
    <div
      className={styles.summary}
      style={{ backgroundColor: color || "#959595" }}>
      {children}
    </div>
  );
};

export default Summary;
