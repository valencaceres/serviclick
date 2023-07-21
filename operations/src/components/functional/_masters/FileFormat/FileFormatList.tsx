import { useState, Fragment } from "react";
import { useRouter } from "next/router";

import {
  ContentCell,
  ContentRow,
  ContentCellSummary,
} from "../../../layout/Content";
import {
  Table,
  TableHeader,
  TableDetail,
  TableRow,
  TableCell,
  TableIcons,
  TableCellEnd,
} from "../../../ui/Table";

import { useFileFormat } from "../../../../hooks";

import styles from "./FileFormat.module.scss";

const FileFormatList = () => {
  const router = useRouter();

  const { fileFormatList, resetFileFormat } = useFileFormat();

  const handleClickRow = (rut: string) => {
    resetFileFormat();
    router.push(`/masters/fileFormat?id=${rut}`);
  };

  return (
    <Fragment>
      <ContentCell gap="10px">
        <Table width="700px">
          <TableHeader>
            <TableCell width="140px" align="center">
              Rut
            </TableCell>
            <TableCell width="545px">Nombre</TableCell>
            <TableCellEnd />
          </TableHeader>
          <TableDetail>
            {fileFormatList.map((item: any, idx: number) => (
              <TableRow key={idx} onClick={() => handleClickRow(item.rut)}>
                <TableCell
                  width="140px"
                  align="center"
                  className={styles.tableCell}
                >
                  {item.rut}
                </TableCell>
                <TableCell width="545px" className={styles.tableCell}>
                  {item.companyname}
                </TableCell>
              </TableRow>
            ))}
          </TableDetail>
        </Table>
      </ContentCell>
    </Fragment>
  );
};

export default FileFormatList;
