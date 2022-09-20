import styles from "./Principal.module.scss";

const Header = ({ children }: any) => {
  return <div className={styles.header}>{children}</div>;
};

export default Header;
