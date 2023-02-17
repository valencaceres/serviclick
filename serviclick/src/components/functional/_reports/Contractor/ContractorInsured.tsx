import { Fragment } from "react";

import {
  ContentCell,
  ContentCellSummary,
  ContentRow,
} from "../../../layout/Content";
import InputText from "../../../ui/InputText/InputText";
import ComboBox from "../../../ui/ComboBox";
import {
  Table,
  TableCell,
  TableCellEnd,
  TableDetail,
  TableHeader,
  TableRow,
} from "../../../ui/Table";
import ButtonIcon from "../../../ui/ButtonIcon/ButtonIcon";

import { dbDateToText } from "../../../../utils/date";

import { useContractor } from "../../../../hooks";

const ContractorInsured = () => {
  const { contractor, subscriptionItem, getSubscriptionById } = useContractor();

  const handleChangeProduct = (e: any) => {
    getSubscriptionById(e.target.value);
  };

  return (
    <Fragment>
      <ContentCell gap="5px">
        <ContentRow gap="5px">
          <ComboBox
            label="Nombre del producto"
            width="425px"
            value={subscriptionItem.subscription_id.toString()}
            onChange={handleChangeProduct}
            data={contractor.subscriptions}
            dataValue="subscription_id"
            dataText="product_name"
          />
          <InputText
            label="Campaña"
            width="425px"
            maxLength={9}
            value={""}
            onChange={() => {}}
            disabled={true}
          />
        </ContentRow>
        <Table width="855px" height="390px">
          <TableHeader>
            <TableCell width="60px">#</TableCell>
            <TableCell width="120px">Rut</TableCell>
            <TableCell width="444px">Nombre completo</TableCell>
            <TableCell width="120px">Incorporación</TableCell>
            <TableCell width="90px">Cargas</TableCell>
            <TableCellEnd />
          </TableHeader>
          <TableDetail>
            {subscriptionItem.insured.map((item, idx: number) => (
              <TableRow key={idx}>
                <TableCell width="60px" align="center">
                  {idx + 1}
                </TableCell>
                <TableCell width="120px" align="right">
                  {item.rut}
                </TableCell>
                <TableCell width="444px">
                  {item.name +
                    " " +
                    item.paternalLastName +
                    " " +
                    item.maternalLastName}
                </TableCell>
                <TableCell width="120px" align="center">
                  {dbDateToText(item.incorporation)}
                </TableCell>
                <TableCell width="90px" align="center">
                  {item.beneficiaries.length === 0
                    ? "No tiene"
                    : item.beneficiaries.length}
                </TableCell>
              </TableRow>
            ))}
          </TableDetail>
        </Table>
        <ContentRow align="space-between">
          <ContentRow gap="5px">
            <ContentCellSummary
              color={subscriptionItem.insured.length > 0 ? "blue" : "#959595"}>
              {subscriptionItem.insured.length > 0
                ? subscriptionItem.insured.length === 1
                  ? `${subscriptionItem.insured.length} beneficiario`
                  : `${subscriptionItem.insured.length} beneficiarios`
                : `No hay beneficiarios`}
            </ContentCellSummary>
          </ContentRow>
          <ButtonIcon iconName="add" color="gray" />
        </ContentRow>
      </ContentCell>
    </Fragment>
  );
};

export default ContractorInsured;
