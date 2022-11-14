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

const RetailProducts = ({ addNewProduct, editProduct, deleteProduct }: any) => {
  const { retail } = useRetail();

  return (
    <ContentCell gap="5px">
      <Table width="739px" height="200px">
        <TableHeader>
          <TableCell width="300px">Producto</TableCell>
          <TableCell width="252px">Campaña</TableCell>
          <TableCell width="100px">Precio</TableCell>
          <TableCell width="68px"></TableCell>
          <TableCellEnd />
        </TableHeader>
        <TableDetail>
          {retail.products.map((item: any, idx: number) => (
            <TableRow key={idx}>
              <TableCell width="300px">{item.name}</TableCell>
              <TableCell width="252px">{item.campaign}</TableCell>
              <TableCell width="100px" align="right">
                $
                {parseInt(item.price.company)
                  .toLocaleString("en-US")
                  .replace(",", ".")}
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
        <ContentCellSummary>
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
