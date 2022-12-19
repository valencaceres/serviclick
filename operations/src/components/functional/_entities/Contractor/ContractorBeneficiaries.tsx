import { useState, useEffect, Fragment } from "react";

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
import ButtonIcon from "../../../ui/ButtonIcon/ButtonIcon";
import ComboBox from "../../../ui/ComboBox";

import { useContractor } from "../../../../hooks";

interface IInsured {
  rut: string;
  fullName: string;
}

const ContractorBeneficiaries = () => {
  const { contractor, subscriptionItem, getSubscriptionById } = useContractor();

  const [rutInsured, setRutInsured] = useState("");
  const [insuredList, setInsuredList] = useState<IInsured[]>([]);

  const handleChangeProduct = (e: any) => {
    getSubscriptionById(e.target.value);
  };

  useEffect(() => {
    if (subscriptionItem.insured.length > 0) {
      setInsuredList(
        subscriptionItem.insured.map((item) => {
          return {
            rut: item.rut,
            fullName:
              item.name +
              " " +
              item.paternalLastName +
              " " +
              item.maternalLastName,
          };
        })
      );
      setRutInsured(subscriptionItem.insured[0].rut);
    }
  }, [subscriptionItem]);

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
        <ContentRow gap="5px">
          <InputText
            label="Rut titular"
            width="200px"
            maxLength={9}
            value={rutInsured}
            onChange={(e: any) => setRutInsured(e.target.value)}
            disabled={true}
          />
          <ComboBox
            label="Nombre completo titular"
            width="650px"
            value={subscriptionItem.subscription_id.toString()}
            onChange={handleChangeProduct}
            data={insuredList}
            dataValue="rut"
            dataText="fullName"
          />
        </ContentRow>
      </ContentCell>
      <Table width="855px" height="200px">
        <TableHeader>
          <TableCell width="60px">#</TableCell>
          <TableCell width="120px">Rut</TableCell>
          <TableCell width="505px">Nombre completo</TableCell>
          <TableCell width="150px">Parentesco</TableCell>
          <TableCellEnd />
        </TableHeader>
        <TableDetail>
          {subscriptionItem.insured
            .filter((item) => item.rut === rutInsured)[0]
            ?.beneficiaries.map((item: any, idx: number) => (
              <TableRow key={idx}>
                <TableCell width="60px" align="center">
                  {idx + 1}
                </TableCell>
                <TableCell width="120px" align="right">
                  {item.rut}
                </TableCell>
                <TableCell width="505px">
                  {item.name +
                    " " +
                    item.paternalLastName +
                    " " +
                    item.maternalLastName}
                </TableCell>
                <TableCell width="150px">&nbsp;</TableCell>
              </TableRow>
            ))}
        </TableDetail>
      </Table>
      <ContentRow align="space-between">
        <ContentRow gap="5px">
          <ContentCellSummary
            color={
              subscriptionItem.insured.filter(
                (item) => item.rut === rutInsured
              )[0]?.beneficiaries.length > 0
                ? "blue"
                : "#959595"
            }>
            {subscriptionItem.insured.filter(
              (item) => item.rut === rutInsured
            )[0]?.beneficiaries.length > 0
              ? subscriptionItem.insured.filter(
                  (item) => item.rut === rutInsured
                )[0]?.beneficiaries.length === 1
                ? `${
                    subscriptionItem.insured.filter(
                      (item) => item.rut === rutInsured
                    )[0]?.beneficiaries.length
                  } carga`
                : `${
                    subscriptionItem.insured.filter(
                      (item) => item.rut === rutInsured
                    )[0]?.beneficiaries.length
                  } cargas`
              : `No hay cargas`}
          </ContentCellSummary>
        </ContentRow>
        <ButtonIcon iconName="add" color="gray" />
      </ContentRow>
    </Fragment>
  );
};

export default ContractorBeneficiaries;
