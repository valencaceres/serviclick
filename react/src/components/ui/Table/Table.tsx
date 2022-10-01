import styles from "./Table.module.scss";

const Table = ({ height, width, children }: any) => {
  return (
    <div
      className={styles.table}
      style={{ height: height ? height : "calc(100vh - 253px)", width }}>
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
  const handleMouseOver = () => {
    if (alt) {
      //alert(alt);
    }
  };

  return (
    <div
      className={styles.cell}
      style={{ width, justifyContent: align }}
      onMouseOver={handleMouseOver}>
      {children}
    </div>
  );
};

const TableIcons = ({ children }: any) => {
  return <div className={styles.icons}>{children}</div>;
};

export { Table, TableHeader, TableDetail, TableRow, TableCell, TableIcons };
