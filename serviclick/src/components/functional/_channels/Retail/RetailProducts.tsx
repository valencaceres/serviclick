import React from "react";

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
import ButtonIcon from "../../../ui/ButtonIcon";
import Icon from "../../../ui/Icon";

import { useRetail } from "../../../../hooks";

import { formatAmount } from "../../../../utils/format";

const RetailProducts = ({ addNewProduct, editProduct, deleteProduct }: any) => {
  const { retail } = useRetail();

  return (
    <ContentCell gap="5px">
      <Table width="739px" height="565px">
        <TableHeader>
          <TableCell width="305px">Producto</TableCell>
          <TableCell width="145px">Descuento</TableCell>
          <TableCell width="100px">Normal</TableCell>
          <TableCell width="100px">Empresa</TableCell>
          <TableCell width="100px">Anual</TableCell>
          <TableCell width="68px"></TableCell>
          <TableCellEnd />
        </TableHeader>
        <TableDetail>
          {retail.products.map((item: any, idx: number) => (
            <TableRow key={idx}>
              <TableCell width="305px">{item?.name}</TableCell>
              <TableCell width="145px" align="center">
                {item?.discount.type === ""
                  ? "Sin descuento"
                  : item?.discount.type === "t" && item?.discount.cicles > 0
                  ? `${item?.discount.cicles} ${
                      item?.discount.cicles > 1 ? "meses" : "mes"
                    } gratis`
                  : item?.discount.type === "p" &&
                    parseInt(item?.discount.percent) > 0 &&
                    parseInt(item?.discount.cicles) > 0
                  ? `${item?.discount.percent}% dcto. ${
                      item?.discount.cicles
                    } ${item?.discount.cicles > 1 ? "meses" : "mes"}`
                  : "Sin descuento"}
              </TableCell>
              <TableCell width="100px" align="right">
                {formatAmount(item.baseprice, item.currency)}
              </TableCell>
              <TableCell width="100px" align="right">
                {formatAmount(item.price, item.currency)}
              </TableCell>
              <TableCell width="100px" align="right">
                {formatAmount(item.yearlyprice, item.currency)}
              </TableCell>
              <TableCell width="68px" align="center">
                <TableIcons>
                  <Icon iconName="edit" onClick={() => editProduct(item)} />
                  <Icon iconName="delete" onClick={() => deleteProduct(item)} />
                </TableIcons>
              </TableCell>
            </TableRow>
          ))}
        </TableDetail>
      </Table>
      <ContentRow align="space-between">
        <ContentCellSummary
          color={retail.products.length > 0 ? "blue" : "#959595"}
        >
          {retail.products.length === 0
            ? "Sin productos asociados"
            : retail.products.length === 1
            ? "1 producto asociado"
            : `${retail.products.length} productos asociados`}
        </ContentCellSummary>
        <ButtonIcon iconName="add" color="gray" onClick={addNewProduct} />
      </ContentRow>
    </ContentCell>
  );
};

export default RetailProducts;
