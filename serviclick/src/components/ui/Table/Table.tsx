import styles from "./Table.module.scss";

const Table = ({ height, width, children }: any) => {
  return (
    <div
      className={styles.table}
      style={{ height: height ? height : "calc(100vh - 220px)", width }}>
      {children}
    </div>
  );
};

const TableHeader = ({ children }: any) => {
  return <div className={styles.tableHeader}>{children}</div>;
};

const TableDetail = ({ children }: any) => {
  return <div className={styles.tableDetail}>{children}</div>;
};

const TableRow = ({ children }: any) => {
  return <div className={styles.row}>{children}</div>;
};

const TableCell = ({ width, align, alt, children }: any) => {
  return (
    <div className={styles.cell} style={{ width, justifyContent: align }}>
      {children}
    </div>
  );
};

const TableIcons = ({ children }: any) => {
  return <div className={styles.icons}>{children}</div>;
};

export { Table, TableHeader, TableDetail, TableRow, TableCell, TableIcons };
