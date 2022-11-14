import styles from "./Sale.module.scss";

const Sale = ({ children }: any) => {
  return <div className={styles.sale}>{children}</div>;
};

const Body = ({ children }: any) => {
  return <div className={styles.body}>{children}</div>;
};

const Footer = ({ children }: any) => {
  return <div className={styles.footer}>{children}</div>;
};

export { Sale, Body, Footer };
