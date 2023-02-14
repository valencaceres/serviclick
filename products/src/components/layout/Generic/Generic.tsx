import styles from "./Generic.module.scss";

const Body = ({ children }: any) => {
  return <div className={styles.body}>{children}</div>;
};

const Content = ({ children }: any) => {
  return <div className={styles.content}>{children}</div>;
};

const Footer = ({ children }: any) => {
  return <div className={styles.footer}>{children}</div>;
};

const Col = ({ children, width, gap = "5px", align = "flex-start" }: any) => {
  return (
    <div className={styles.col} style={{ width, gap, alignItems: align }}>
      {children}
    </div>
  );
};

const Row = ({ children, align = "flex-start", gap = "5px" }: any) => {
  return (
    <div className={styles.row} style={{ justifyContent: align, gap }}>
      {children}
    </div>
  );
};

const RowCol = ({ children, align = "flex-start", gap = "5px" }: any) => {
  return (
    <div className={styles.rowCol} style={{ justifyContent: align, gap }}>
      {children}
    </div>
  );
};

export { Body, Content, Col, Row, RowCol, Footer };
