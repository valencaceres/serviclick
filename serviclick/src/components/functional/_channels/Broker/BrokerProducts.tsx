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
      <Table width="739px" height="226px">
        <TableHeader>
          <TableCell width="305px">Producto</TableCell>
          <TableCell width="145px">Descuento</TableCell>
          <TableCell width="100px">Público</TableCell>
          <TableCell width="100px">Empresa</TableCell>
          <TableCell width="68px"></TableCell>
          <TableCellEnd />
        </TableHeader>
        <TableDetail>
          {broker.products.map((item: any, idx: number) => (
            <TableRow key={idx}>
              <TableCell width="305px">{item.name}</TableCell>
              <TableCell width="145px" align="center">
                {item.discount.type === ""
                  ? "Sin descuento"
                  : item.discount.type === "t" && item.discount.cicles > 0
                  ? `${item.discount.cicles} ${
                      item.discount.cicles > 1 ? "meses" : "mes"
                    } gratis`
                  : item.discount.type === "p" &&
                    item.discount.percent > 0 &&
                    item.discount.cicles > 0
                  ? `${item.discount.percent}% dcto. ${item.discount.cicles} ${
                      item.discount.cicles > 1 ? "meses" : "mes"
                    }`
                  : "Sin descuento"}
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
        <ContentCellSummary
          color={broker.products.length > 0 ? "blue" : "#959595"}>
          {broker.products.length === 0
            ? "Sin productos asociados"
            : broker.products.length === 1
            ? "1 producto asociado"
            : `${broker.products.length} productos asociados`}
        </ContentCellSummary>
        {/* <ButtonIcon iconName="add" color="gray" onClick={addNewProduct} /> */}
      </ContentRow>
    </ContentCell>
  );
};

export default BrokerProducts;
