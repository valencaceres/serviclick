import React from "react";

import styles from "./Table.module.scss";

interface TableProps {
  text?: string;
  textTwo?: string;
  textThree?: string;
  textFour?: string;
  textSpan?: string;
  alignLeft?: boolean;
}

const TableHeader = ({
  text,
  textFour,
  textThree,
  textTwo,
  alignLeft = false,
}: TableProps) => {
  const alignmentClass = alignLeft ? styles.alignLeft : styles.alignCenter;
  return (
    <div className={`${styles.tableHeader} ${alignmentClass}`}>{text}</div>
  );
};

const TableTitle = ({ text, alignLeft = false }: TableProps) => {
  const alignmentClass = alignLeft ? styles.alignLeft : styles.alignCenter;
  return <div className={`${styles.tableTitle} ${alignmentClass}`}>{text}</div>;
};

const TableCell = ({ text, textSpan, alignLeft = false }: TableProps) => {
  const alignmentClass = alignLeft ? styles.alignLeft : styles.alignCenter;
  return (
    <div className={`${styles.tableCell} ${alignmentClass}`}>
      <span>{textSpan}</span>
      {text}
    </div>
  );
};

export { TableHeader, TableCell, TableTitle };
