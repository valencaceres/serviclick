import { ReactNode } from "react";

export interface ITableRow {
  link?: boolean;
  onClick?: any;
  children: any;
}

export interface ITableCell {
  width: string;
  align?: string;
  children: any;
}

export interface ITable {
  header: ITableHeader[];
  detail: ITableDetail[];
  heightHead?: string;
}

export interface ITableHeader {
  text: string;
  align?: string;
  type?: string;
  width: string;
}

export interface ITableDetail {
  rowData: (ReactNode | IAccionTable[])[];
}

export interface IAccionTable {
  icon: string;
  type: string;
  text: string;
  onClick: () => void;
}

export interface IconT {
  iconName: string;
  className?: string;
  onClick?: any;
  size?: string;
}
