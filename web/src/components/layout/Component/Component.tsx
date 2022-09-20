import styles from "./Component.module.scss";

const Component = ({ width, children }: any) => {
  return (
    <div className={styles.component} style={{ width }}>
      {children}
    </div>
  );
};

const Row = ({ children, className }: any) => {
  return <div className={styles.row + " " + className}>{children}</div>;
};

const CellSeparator = ({ children }: any) => {
  return <div className={styles.cellSeparator}>{children}</div>;
};

const Cell = ({ children, align = "left" }: any) => {
  return <div className={styles.cell}>{children}</div>;
};

const CellCenter = ({ children }: any) => {
  return <div className={styles.cellCenter}>{children}</div>;
};

export { Component, Row, Cell, CellSeparator, CellCenter };
