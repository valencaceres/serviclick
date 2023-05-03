import React from "react";

import {
  Table,
  TableCell,
  TableCellEnd,
  TableDetail,
  TableHeader,
  TableRow,
} from "../../ui/Table";

import { useBroker } from "../../../hooks";

import { currencyFormat } from "../../../utils/format";

import styles from "./Collect.module.scss";
import {
  Content,
  ContentCellSummary,
  ContentCell,
  ContentRow,
} from "../../layout/Content";

const Collect = () => {
  const { collect } = useBroker();

  return (
    <Content>
      <ContentCell gap="5px">
        <Table width="1230px">
          <TableHeader>
            <TableCell width="250px">Cliente</TableCell>
            <TableCell width="250px">Producto</TableCell>
            <TableCell width="100px">Compra</TableCell>
            <TableCell width="100px">Valor</TableCell>
            <TableCell width="100px">Mes gratis</TableCell>
            <TableCell width="100px">Cuotas</TableCell>
            <TableCell width="100px">Cobrado</TableCell>
            <TableCell width="100px">Pagado</TableCell>
            <TableCell width="100px">Deuda</TableCell>
            <TableCellEnd></TableCellEnd>
          </TableHeader>
          <TableDetail>
            {collect.map((item: any, idx: number) => (
              <TableRow key={idx}>
                <TableCell width="250px">{item.customer_name}</TableCell>
                <TableCell width="250px">{item.product_name}</TableCell>
                <TableCell width="100px">{item.incorporation}</TableCell>
                <TableCell width="100px" align="right">
                  {currencyFormat(item.fee_value)}
                </TableCell>
                <TableCell width="100px" align="right">
                  {item.free_months}
                </TableCell>
                <TableCell width="100px" align="right">
                  {item.fees_charged}
                </TableCell>
                <TableCell width="100px" align="right">
                  {currencyFormat(item.charged)}
                </TableCell>
                <TableCell width="100px" align="right">
                  {currencyFormat(parseInt(item.paid))}
                </TableCell>
                <TableCell width="100px" align="right">
                  {currencyFormat(item.balance)}
                </TableCell>
              </TableRow>
            ))}
          </TableDetail>
        </Table>
        <ContentRow gap="5px">
          <ContentCellSummary>{collect.length} ventas</ContentCellSummary>
          <ContentCellSummary>
            {currencyFormat(
              collect.reduce(
                (acum: number, item: any) => acum + +item.charged,
                0
              )
            )}{" "}
            cobrado
          </ContentCellSummary>
          <ContentCellSummary>
            {currencyFormat(
              collect.reduce(
                (acum: number, item: any) => acum + parseInt(item.paid),
                0
              )
            )}{" "}
            pagado
          </ContentCellSummary>
          <ContentCellSummary>
            {currencyFormat(
              collect.reduce(
                (acum: number, item: any) => acum + parseInt(item.balance),
                0
              )
            )}{" "}
            deuda
          </ContentCellSummary>
        </ContentRow>
      </ContentCell>
    </Content>
  );
};

export default Collect;
