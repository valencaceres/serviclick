import { useEffect, Fragment } from "react";

import {
  ContentCell,
  ContentCellSummary,
  ContentRow,
} from "../../../layout/Content";
import ComboBox from "../../../ui/ComboBox";
import InputText from "../../../ui/InputText/InputText";
import {
  Table,
  TableCell,
  TableCellEnd,
  TableDetail,
  TableHeader,
  TableRow,
} from "../../../ui/Table";

import { formatAmount } from "../../../../utils/format";

import { useProduct, useRetail } from "~/hooks";

const RetailProduct = () => {
  const { getByProductPlanId, product: productDetail } = useProduct();
  const { retailSelectedProduct } = useRetail();

  useEffect(() => {
    if (retailSelectedProduct && retailSelectedProduct.productplan_id) {
      getByProductPlanId(retailSelectedProduct.productplan_id);
    }
  }, [retailSelectedProduct]);

  return (
    <Fragment>
      <ContentRow gap="5px">
        <InputText
          label="Producto"
          width="100%"
          disabled={true}
          value={retailSelectedProduct?.name || ""}
        />
        <InputText
          label="Precio"
          disabled={true}
          width="150px"
          value={formatAmount(
            retailSelectedProduct && retailSelectedProduct.price
              ? retailSelectedProduct?.price?.customer?.toString() || "0"
              : "0",
            retailSelectedProduct?.currency || ""
          )}
        />
        <InputText
          label="Frecuencia"
          disabled={true}
          width="150px"
          value={
            retailSelectedProduct && retailSelectedProduct.frequency
              ? retailSelectedProduct.frequency === "M"
                ? "Mensual"
                : retailSelectedProduct.frequency === "A"
                ? "Anual"
                : "Semestral"
              : "Mensual"
          }
          isValid={true}
        />
      </ContentRow>
      <Table width="855px" height="390px">
        <TableHeader>
          <TableCell width="320px">Servicio</TableCell>
          <TableCell width="100px">Monto</TableCell>
          <TableCell width="244px">Límite</TableCell>
          <TableCell width="80px">Eventos</TableCell>
          <TableCell width="90px">Carencia</TableCell>
          <TableCellEnd />
        </TableHeader>
        <TableDetail>
          {productDetail.assistances?.map((item, idx) => (
            <TableRow key={idx}>
              <TableCell width="320px">{item.name}</TableCell>
              <TableCell width="100px" align="center">
                {formatAmount(item.amount.toString(), item.currency)}
              </TableCell>
              <TableCell width="244px" align="center">
                {item.maximum}
              </TableCell>
              <TableCell width="80px" align="center">{`${
                item.events === 0 ? "Ilimitado" : item.events
              }`}</TableCell>
              <TableCell width="90px" align="center">
                {item.lack}
              </TableCell>
            </TableRow>
          ))}
        </TableDetail>
      </Table>
      <ContentRow align="space-between">
        <ContentCellSummary
          color={productDetail.assistances?.length > 0 ? "blue" : "#959595"}
        >
          {productDetail.assistances?.length > 0
            ? productDetail.assistances?.length === 1
              ? `${productDetail.assistances?.length} servicio`
              : `${productDetail.assistances?.length} servicios`
            : `No hay servicios`}
        </ContentCellSummary>
      </ContentRow>
    </Fragment>
  );
};

export default RetailProduct;
