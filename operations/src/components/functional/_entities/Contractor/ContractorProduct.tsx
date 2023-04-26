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

import { useContractor } from "../../../../hooks";

const ContractorProduct = ({ contractor }: any) => {
  const { subscriptionItem, getSubscriptionById } = useContractor();

  const handleChangeProduct = (e: any) => {
    getSubscriptionById(e.target.value);
  };

  return (
    <Fragment>
      <ContentRow gap="5px">
        <ComboBox
          label="Producto"
          width="100%"
          value={subscriptionItem.subscription_id.toString()}
          onChange={handleChangeProduct}
          data={contractor?.subscriptions}
          dataValue="subscription_id"
          dataText="product_name"
        />
        <InputText
          label="Adquisición"
          type="date"
          disabled={true}
          width="150px"
          maxLength={9}
          value={subscriptionItem.createDate}
          onChange={() => {}}
          isValid={true}
        />
        <InputText
          label="Inicio vigencia"
          type="date"
          disabled={true}
          width="150px"
          maxLength={9}
          value={subscriptionItem.startDate}
          onChange={() => {}}
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
          {subscriptionItem.assistances.map((item, idx) => (
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
          color={subscriptionItem.assistances.length > 0 ? "blue" : "#959595"}
        >
          {subscriptionItem.assistances.length > 0
            ? subscriptionItem.assistances.length === 1
              ? `${subscriptionItem.assistances.length} servicio`
              : `${subscriptionItem.assistances.length} servicios`
            : `No hay servicios`}
        </ContentCellSummary>
      </ContentRow>
    </Fragment>
  );
};

export default ContractorProduct;
