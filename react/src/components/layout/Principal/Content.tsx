import styles from "./Principal.module.scss";

const Content = ({ children }: any) => {
  return <div className={styles.content}>{children}</div>;
};

export default Content;
