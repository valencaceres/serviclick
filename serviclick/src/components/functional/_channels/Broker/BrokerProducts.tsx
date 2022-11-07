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

import { useBroker } from "../../../../hooks";

const BrokerProducts = ({ addNewProduct, editProduct, deleteProduct }: any) => {
  const { broker } = useBroker();

  return (
    <ContentCell gap="5px">
      <Table width="739px" height="200px">
        <TableHeader>
          <TableCell width="350px">Producto</TableCell>
          <TableCell width="100px">Comisión</TableCell>
          <TableCell width="100px">Público</TableCell>
          <TableCell width="100px">Empresa</TableCell>
          <TableCell width="68px"></TableCell>
          <TableCellEnd />
        </TableHeader>
        <TableDetail>
          {broker.products.map((item: any, idx: number) => (
            <TableRow key={idx}>
              <TableCell width="350px">{item.name}</TableCell>
              <TableCell width="100px" align="center">
                {item.commisionTypeCode === "P"
                  ? `${item.value}%`
                  : `$${parseInt(item.value)
                      .toLocaleString("en-US")
                      .replace(",", ".")}`}
              </TableCell>
              <TableCell width="100px" align="right">
                ${item.price.customer.toLocaleString("en-US").replace(",", ".")}
              </TableCell>
              <TableCell width="100px" align="right">
                ${item.price.company.toLocaleString("en-US").replace(",", ".")}
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
          {broker.products.length === 0
            ? "Sin productos asociados"
            : broker.products.length === 1
            ? "1 producto asociado"
            : `${broker.products.length} productos asociados`}
        </ContentCellSummary>
        <ButtonIcon iconName="add" color="gray" onClick={addNewProduct} />
      </ContentRow>
    </ContentCell>
  );
};

export default BrokerProducts;
