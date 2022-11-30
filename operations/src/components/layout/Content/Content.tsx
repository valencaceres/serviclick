import useUI from "../../../hooks/useUI";

import styles from "./Content.module.scss";

const Content = ({ children, align }: any) => {
  const { setShowMenuUI } = useUI();

  return (
    <div
      className={styles.content}
      style={{ justifyContent: align }}
      onClick={() => setShowMenuUI(false)}>
      {children}
    </div>
  );
};

const ContentRow = ({ children, align, gap, className }: any) => {
  return (
    <div
      className={`${styles.contentRow} ${className}`}
      style={{
        alignItems: "center",
        justifyContent: align,
        gap,
      }}>
      {children}
    </div>
  );
};

const ContentCell = ({ children, align, gap, className }: any) => {
  return (
    <div
      className={`${styles.contentCell} ${className}`}
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
