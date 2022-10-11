import styles from "./Content.module.scss";

const Content = ({ children, align }: any) => {
  return (
    <div className={styles.content} style={{ justifyContent: align }}>
      {children}
    </div>
  );
};

const ContentRow = ({ children, align, gap }: any) => {
  return (
    <div
      className={styles.contentRow}
      style={{
        alignItems: "center",
        justifyContent: align,
        gap,
      }}>
      {children}
    </div>
  );
};

const ContentCell = ({ children, align, gap }: any) => {
  return (
    <div
      className={styles.contentCell}
      style={{
        alignItems: align,
        justifyContent: "center",
        gap,
      }}>
      {children}
    </div>
  );
};

const ContentCellSummary = ({ children }: any) => {
  return <div className={styles.contentCellSummary}>{children}</div>;
};

export { Content, ContentRow, ContentCell, ContentCellSummary };
