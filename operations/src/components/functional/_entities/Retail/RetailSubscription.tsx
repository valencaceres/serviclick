import { Fragment, useEffect, useState } from "react";

import {
  ContentCell,
  ContentCellSummary,
  ContentRow,
} from "../../../layout/Content";
import InputText from "../../../ui/InputText/InputText";
import {
  Table,
  TableCell,
  TableCellEnd,
  TableDetail,
  TableHeader,
  TableRow,
} from "../../../ui/Table";

import { dbDateToText } from "../../../../utils/date";
import { formatAmount } from "../../../../utils/format";

interface IPayment {
  collected: number;
  paid: number;
  due: number;
}

const RetailSubscription = ({ retail }: any) => {
  const [payment, setPayment] = useState<IPayment>({
    collected: 0,
    paid: 0,
    due: 0,
  });

  useEffect(() => {
    if (retail?.payment.length > 0) {
      setPayment({
        collected: retail.payment.reduce(
          (acum: number, item: any) => acum + item.collected_amount,
          0
        ),
        paid: retail.payment.reduce(
          (acum: number, item: any) => acum + +item.paid_amount,
          0
        ),
        due: retail.payment.reduce(
          (acum: number, item: any) =>
            acum + (item.collected_amount - item.paid_amount),
          0
        ),
      });
    }
  }, [retail]);

  return (
    <Fragment>
      <ContentCell gap="5px">
        <Table width="855px" height="390px">
          <TableHeader>
            <TableCell width="434px">Producto</TableCell>
            <TableCell width="100px">Adquisición</TableCell>
            <TableCell width="100px">Cobrado</TableCell>
            <TableCell width="100px">Recaudado</TableCell>
            <TableCell width="100px">Adeudado</TableCell>
            <TableCellEnd />
          </TableHeader>
          <TableDetail>
            {retail?.payment.map((item: any, idx: number) => (
              <TableRow key={idx}>
                <TableCell width="434px">{item.product_name}</TableCell>
                <TableCell width="100px" align="center">
                  {dbDateToText(item.createDate)}
                </TableCell>
                <TableCell width="100px" align="right">
                  {formatAmount(item.collected_amount.toString(), "P")}
                </TableCell>
                <TableCell width="100px" align="right">
                  {formatAmount(item.paid_amount.toString(), "P")}
                </TableCell>
                <TableCell width="100px" align="right">
                  {formatAmount(
                    (item.collected_amount - item.paid_amount).toString(),
                    "P"
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableDetail>
        </Table>
        <ContentRow gap="5px">
          <ContentCellSummary color="blue">{`${formatAmount(
            payment.collected.toString(),
            "P"
          )} recaudado`}</ContentCellSummary>
          <ContentCellSummary color="blue">{`${formatAmount(
            payment.paid.toString(),
            "P"
          )} pagado`}</ContentCellSummary>
          <ContentCellSummary color={payment.due > 0 ? "red" : "green"}>
            {payment.due > 0
              ? `${formatAmount(payment.due.toString(), "P")} adeudado`
              : "Sin deuda"}
          </ContentCellSummary>
        </ContentRow>
      </ContentCell>
    </Fragment>
  );
};

export default RetailSubscription;
