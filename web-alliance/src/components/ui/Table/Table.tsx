import styles from "./Table.module.scss";

interface ITableRow {
  link?: boolean;
  onClick?: any;
  children: any;
}

interface ITableCell {
  width: string;
  align?: string;
  children: any;
}

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

const TableRow = ({ link, onClick, children }: ITableRow) => {
  return (
    <div
      className={`${styles.row} ${link ? styles.link : ``}`}
      onClick={() => (onClick ? onClick() : {})}>
      {children}
    </div>
  );
};

const TableCell = ({ width, align, children }: ITableCell) => {
  return (
    <div className={styles.cell} style={{ width, justifyContent: align }}>
      {children}
    </div>
  );
};

const TableCellWide = ({ width, align, alt, children }: any) => {
  return (
    <div
      className={styles.cell + " " + styles.cellWide}
      style={{ width, justifyContent: align }}>
      <p>{children}</p>
    </div>
  );
};

const TableIcons = ({ children }: any) => {
  return <div className={styles.icons}>{children}</div>;
};

const TableCellEnd = () => {
  return <div className={styles.cellEnd}></div>;
};

export {
  Table,
  TableHeader,
  TableDetail,
  TableRow,
  TableCell,
  TableCellWide,
  TableIcons,
  TableCellEnd,
};
