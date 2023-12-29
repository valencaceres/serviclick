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

import { formatAmount } from "../../../../utils/format";
import { IContractorData } from "~/interfaces/customer";

interface IPayment {
  collected: number;
  paid: number;
  due: number;
}

const ContractorSubscription: React.FC<{ contractor: IContractorData }> = ({
  contractor,
}) => {
  const [payment, setPayment] = useState<IPayment>({
    collected: 0,
    paid: 0,
    due: 0,
  });

  const totalCharged = contractor?.origins
    .filter((item: any) => item?.balance && item.balance.length > 0)
    .reduce(
      (acc, item) => acc + ((item?.balance && item.balance[0]?.charged) || 0),
      0
    );

  const totalPaid = contractor?.origins
    .filter((item: any) => item?.balance && item.balance.length > 0)
    .reduce(
      (acc, item) => acc + ((item?.balance && item.balance[0]?.paid) || 0),
      0
    );

  const totalBalance = contractor?.origins
    .filter((item: any) => item?.balance && item.balance.length > 0)
    .reduce(
      (acc, item) => acc + ((item?.balance && item.balance[0]?.balance) || 0),
      0
    );

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
            {contractor?.origins
              .filter((item: any) => item?.balance !== null)
              .map((item: any, idx: number) => (
                <TableRow key={idx}>
                  <TableCell width="434px">{item?.product?.name}</TableCell>
                  <TableCell width="100px" align="center">
                    {item?.dates?.purchase}
                  </TableCell>
                  <TableCell width="100px" align="right">
                    {formatAmount(item?.balance[0]?.charged?.toString(), "P")}
                  </TableCell>
                  <TableCell width="100px" align="right">
                    {formatAmount(item?.balance[0]?.paid?.toString(), "P")}
                  </TableCell>
                  <TableCell width="100px" align="right">
                    {formatAmount(item?.balance[0]?.balance?.toString(), "P")}
                  </TableCell>
                </TableRow>
              ))}
          </TableDetail>
        </Table>
        <ContentRow gap="5px">
          <ContentCellSummary color="blue">{`${formatAmount(
            totalCharged?.toString(),
            "P"
          )} recaudado`}</ContentCellSummary>
          <ContentCellSummary color="blue">{`${formatAmount(
            totalPaid?.toString(),
            "P"
          )} pagado`}</ContentCellSummary>
          <ContentCellSummary color={totalBalance > 0 ? "red" : "green"}>
            {totalBalance > 0
              ? `${formatAmount(totalBalance?.toString(), "P")} adeudado`
              : "Sin deuda"}
          </ContentCellSummary>
        </ContentRow>
      </ContentCell>
    </Fragment>
  );
};

export default ContractorSubscription;
