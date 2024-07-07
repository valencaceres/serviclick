import { ReactNode } from "react";
import {
  IAccionTable,
  ITable,
  ITableDetail,
  ITableHeader,
} from "../../../interfaces/table";
import styles from "./Table2.module.scss";

const Table2 = (data: ITable) => {
  return (
    <div className={styles.containerTable}>
      <table className={styles.table}>
        <thead>
          <tr style={{ height: data.heightHead }}>
            {data.header?.map((header, idx: number) => (
              <TableHeaderTH
                key={idx}
                text={header.text}
                width={header.width}
              />
            ))}
          </tr>
        </thead>
        <TableDetail header={data.header} detail={data.detail} />
      </table>
    </div>
  );
};

const TableHeaderTH = ({ text, width }: ITableHeader) => {
  return <th style={{ width }}>{text}</th>;
};

const TableDetail = ({ header, detail }: any) => {
  return (
    <tbody className={styles.tbody}>
      {detail?.map((detailItem: any, rowIndex: any) => (
        <tr key={rowIndex}>
          {detailItem.rowData.map((cellData: any, cellIndex: any) => (
            <td key={cellIndex} style={{ textAlign: header[cellIndex]?.align }}>
              <div className={styles.contenAccion}>
                {Array.isArray(cellData)
                  ? cellData.map((accion: IAccionTable, key) => (
                      <span
                        key={key}
                        className={`material-symbols-outlined ${
                          styles[accion.type]
                        }`}
                        onClick={accion.onClick}
                      >
                        {accion.icon}
                        <p
                          className={`${
                            accion.type === "delete" ? styles.deleteText : ""
                          }`}
                        >
                          {accion.text}
                        </p>
                      </span>
                    ))
                  : cellData}
              </div>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

interface ITableHeaderProps {
  children: ReactNode;
}

const TableHeader = ({ children }: ITableHeaderProps) => {
  return <div className={styles.headerTable}>{children}</div>;
};

interface ITableFooterProps {
  children: ReactNode;
  length: string;
}

const TableFooter = ({ children, length }: ITableFooterProps) => {
  return (
    <div className={styles.footerTable}>
      <p className={styles.lengthDetail}>{length}</p>
      {children}
    </div>
  );
};

interface ITableMain {
  children: ReactNode;
  marginTop?: string;
}

const TableMain = ({ children, marginTop }: ITableMain) => {
  return (
    <div className={styles.tableMain} style={{ marginTop }}>
      {children}
    </div>
  );
};

export { Table2, TableHeader, TableFooter, TableMain };
