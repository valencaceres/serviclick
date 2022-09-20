import styles from "./Generic.module.scss";

const Component = ({ children }: any) => {
  return <div className={styles.component}>{children}</div>;
};

const Row = ({ children }: any) => {
  return <div className={styles.row}>{children}</div>;
};

const Cell = ({ children }: any) => {
  return <div className={styles.cell}>{children}</div>;
};

const CellSeparator = ({ children }: any) => {
  return <div className={styles.cellSeparator}>{children}</div>;
};

const CellAlign = ({ children, align }: any) => {
  return (
    <div
      className={
        align === "left" ? styles.cellAlignLeft : styles.cellAlignRight
      }
    >
      {children}
    </div>
  );
};

export { Component, Row, Cell, CellSeparator, CellAlign };
