import styles from "./Principal.module.scss";

const Screen = ({ children }: any) => {
  return <div className={styles.screen}>{children}</div>;
};

export default Screen;
