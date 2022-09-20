import styles from "./Principal.module.scss";

const Body = ({ children }: any) => {
  return <div className={styles.body}>{children}</div>;
};

export default Body;
