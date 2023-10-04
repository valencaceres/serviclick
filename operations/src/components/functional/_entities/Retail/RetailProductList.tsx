import React, { Fragment, useState } from "react";

import {
  ContentCell,
  ContentCellSummary,
  ContentRow,
} from "../../../layout/Content";
import {
  Table,
  TableHeader,
  TableDetail,
  TableRow,
  TableCell,
  TableCellEnd,
} from "../../../ui/Table";

import { useRetail } from "../../../../hooks";

const RetailProductList = ({ handleClickProduct }: any) => {
  const { retail } = useRetail();

  return (
    <Fragment>
      <ContentCell gap="5px">
        <Table width="485px" height="390px">
          <TableHeader>
            <TableCell width="350px">Producto</TableCell>
            <TableCell width="120px">Suscripciones</TableCell>
            <TableCellEnd />
          </TableHeader>
          <TableDetail>
            {retail.products?.map((item: any, idx: number) => (
              <TableRow
                key={idx}
                link={true}
                onClick={() => handleClickProduct(item)}
              >
                <TableCell width="350px">{item.name}</TableCell>
                <TableCell width="120px" align="center">
                  {item.subscriptions}
                </TableCell>
              </TableRow>
            ))}
          </TableDetail>
        </Table>
        <ContentRow gap="5px">
          <ContentCellSummary
            color={retail.products?.length > 0 ? "blue" : "#959595"}
          >
            {retail.products && retail.products.length > 0
              ? retail.products?.length === 1
                ? `${retail.products?.length} producto`
                : `${retail.products?.length} productos`
              : `No hay productos`}
          </ContentCellSummary>
          <ContentCellSummary
            color={
              retail.products.reduce(
                (acum: number, item: any) =>
                  acum + parseInt(item.subscriptions.toString()),
                0
              ) > 0
                ? "blue"
                : "#959595"
            }
          >{`${
            retail.products && retail.products.length
              ? retail.products.reduce(
                  (acum: number, item: any) =>
                    acum + parseInt(item.subscriptions.toString()),
                  0
                ) > 0
                ? retail.products.reduce(
                    (acum: number, item: any) =>
                      acum + parseInt(item.subscriptions.toString()),
                    0
                  )
                : "No hay"
              : "No hay"
          } suscripciones`}</ContentCellSummary>
        </ContentRow>
      </ContentCell>
    </Fragment>
  );
};

export default RetailProductList;
