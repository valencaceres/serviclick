import styles from "./TableWide.module.scss";

const TableWide = ({ height, width, children }: any) => {
  return (
    <div
      className={styles.table}
      style={{ height: height ? height : "calc(100vh - 220px)", width }}>
      {children}
    </div>
  );
};

const TableWHeader = ({ children }: any) => {
  return <div className={styles.tableHeader}>{children}</div>;
};

const TableWDetail = ({ children }: any) => {
  return <div className={styles.tableDetail}>{children}</div>;
};

const TableWRow = ({ children }: any) => {
  return <div className={styles.row}>{children}</div>;
};

const TableWCell = ({ width, children }: any) => {
  return (
    <div className={styles.cell} style={{ width }}>
      <p>{children}</p>
    </div>
  );
};

const TableWCellIcons = ({ width, children }: any) => {
  return (
    <div className={styles.cell} style={{ width }}>
      {children}
    </div>
  );
};

const TableWIcons = ({ children }: any) => {
  return <div className={styles.icons}>{children}</div>;
};

const TableWCellEnd = () => {
  return <div className={styles.cellEnd}></div>;
};

export {
  TableWide,
  TableWHeader,
  TableWDetail,
  TableWRow,
  TableWCell,
  TableWCellIcons,
  TableWIcons,
  TableWCellEnd,
};
