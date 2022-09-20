import styles from "./Principal.module.scss";

const HeaderCell = ({ children }: any) => {
  return <div className={styles.headerCell}>{children}</div>;
};

export default HeaderCell;
