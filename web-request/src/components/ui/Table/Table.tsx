import styles from "./Table.module.scss";

interface ITableRow {
  link?: boolean;
  children: React.ReactNode;
}

interface ITable {
  height?: string,
  width?: string,
  children: React.ReactNode
}

interface ITableCell {
  width: string;
  align?: string;
  children?: React.ReactNode;
  className?: string;
}

interface ITableChildren {
  children: React.ReactNode
}

interface ITableCellWide {
  width: string,
  align: string,
  children: React.ReactNode 
}

interface ITableCellText {
  placeholder: string,
  value: string,
  onChange: () => void,
  
}

const Table = ({ height, width, children }: ITable) => {
  return (
    <div
      className={styles.table}
      style={{ height: height ? height : "calc(100vh - 220px)", width }}
    >
      {children}
    </div>
  );
};

const TableHeader = ({ children }: ITableChildren) => {
  return <div className={styles.tableHeader}>{children}</div>;
};

const TableDetail = ({ children }: ITableChildren) => {
  return <div className={styles.tableDetail}>{children}</div>;
};

const TableRow = ({ link, children }: ITableRow) => {
  return (
    <div
      className={`${styles.row} ${link ? styles.link : ``}`}
    >
      {children}
    </div>
  );
};

const TableCell = ({ width, align, children, className }: ITableCell) => {
  return (
    <div
      className={`${styles.cell} ${className}`}
      style={{ width, justifyContent: align }}
    >
      {children}
    </div>
  );
};

const TableCellWide = ({ width, align, children }: ITableCellWide) => {
  return (
    <div
      className={styles.cell + " " + styles.cellWide}
      style={{ width, justifyContent: align }}
    >
      <p>{children}</p>
    </div>
  );
};

const TableIcons = ({ children }: ITableChildren) => {
  return <div className={styles.icons}>{children}</div>;
};

const TableCellEnd = () => {
  return <div className={styles.cellEnd}></div>;
};

const TableCellText = ({ placeholder, value, onChange }: ITableCellText) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      className={styles.inputText}
      onChange={onChange}
    />
  );
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
  TableCellText,
};
