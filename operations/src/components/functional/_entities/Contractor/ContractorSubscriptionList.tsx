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

import { dbDateToText } from "../../../../utils/date";

const ContractorSubscriptionList = ({ contractor, subscriptionClick }: any) => {
  return (
    <ContentCell gap="5px">
      <Table width="485px" height="435px">
        <TableHeader>
          <TableCell width="360px">Producto</TableCell>
          <TableCell width="110px">Adquisición</TableCell>
          <TableCellEnd />
        </TableHeader>
        <TableDetail>
          {contractor.subscriptions?.map((item: any, idx: number) => (
            <TableRow
              key={idx}
              link={true}
              onClick={() => subscriptionClick(item)}
            >
              <TableCell width="360px">{item.product_name}</TableCell>
              <TableCell width="110px" align="center">
                {dbDateToText(item.createDate)}
              </TableCell>
            </TableRow>
          ))}
        </TableDetail>
      </Table>
      <ContentRow align="space-between">
        <ContentCellSummary
          color={contractor.subscriptions?.length > 0 ? "blue" : "#959595"}
        >
          {contractor.subscriptions.length > 0
            ? contractor.subscriptions.length === 1
              ? `${contractor.subscriptions.length} suscripción`
              : `${contractor.subscriptions.length} suscripciones`
            : `No hay suscripciones`}
        </ContentCellSummary>
      </ContentRow>
    </ContentCell>
  );
};

export default ContractorSubscriptionList;
