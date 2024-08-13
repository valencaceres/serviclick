import styles from "./Modal.module.scss";

const Window = ({ title, children, setIsShowModal, setClosed }: any) => {
  return (
    <div className={styles.window}>
      <div className={styles.header}>
        <div className={styles.left}></div>
        <div className={styles.title}>{title}</div>
        <div className={styles.closeButton} onClick={setClosed}></div>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Window;
