import styles from "./MasterDetail.module.scss";

const MasterDetail = ({ children }: any) => {
  return <div className={styles.masterDetail}>{children}</div>;
};

const Title = ({ children }: any) => {
  return <div className={styles.title}>{children}</div>;
};

const Left = ({ children }: any) => {
  return <div className={styles.left}>{children}</div>;
};

const Center = ({ children }: any) => {
  return <div className={styles.center}>{children}</div>;
};

const Right = ({ children }: any) => {
  return <div className={styles.right}>{children}</div>;
};

const Detail = ({ children }: any) => {
  return <div className={styles.detail}>{children}</div>;
};

const Buttons = ({ children }: any) => {
  return <div className={styles.buttons}>{children}</div>;
};

export { MasterDetail, Title, Left, Center, Right, Detail, Buttons };
