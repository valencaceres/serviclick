import { useState, useEffect, Fragment } from "react";

import InsuredForm from "./InsuredForm";

import {
  Content,
  ContentCell,
  ContentCellSummary,
  ContentRow,
} from "../../layout/Content";

import {
  Table,
  TableCell,
  TableCellEnd,
  TableDetail,
  TableHeader,
  TableIcons,
  TableRow,
} from "../../ui/Table";
import Icon from "../../ui/Icon";

import { useLead } from "../../../hooks";
import ButtonIcon from "../../ui/ButtonIcon";
import Button from "../../ui/Button";
import ModalWindow from "../../ui/ModalWindow";

type ValueT = {
  value: string;
  isValid: boolean;
};

type InsuredFormT = {
  rut: ValueT;
  birthDate: ValueT;
  name: ValueT;
  paternalLastName: ValueT;
  maternalLastName: ValueT;
  address: ValueT;
  district: ValueT;
  email: ValueT;
  phone: ValueT;
};

type InsuredT = {
  insuredForm: InsuredFormT;
  setInsuredForm: any;
  addInsured: any;
  showModal: boolean;
  setShowModal: any;
  editInsured: any;
  deleteInsured: any;
};

const Insured = ({
  insuredForm,
  setInsuredForm,
  addInsured,
  showModal,
  setShowModal,
  editInsured,
  deleteInsured,
}: InsuredT) => {
  const { lead } = useLead();

  const initialDataInsured = {
    rut: { value: "", isValid: false },
    birthDate: { value: "", isValid: false },
    name: { value: "", isValid: false },
    paternalLastName: { value: "", isValid: false },
    maternalLastName: { value: "", isValid: false },
    address: { value: "", isValid: false },
    district: { value: "", isValid: false },
    email: { value: "", isValid: false },
    phone: { value: "", isValid: false },
  };

  const [isButtonAddEnabled, setIsButtonAddEnabled] = useState(false);

  const handleClickNewInsured = () => {
    setInsuredForm(initialDataInsured);
    setShowModal(true);
  };

  const handleCloseClick = () => {
    setShowModal(false);
  };

  useEffect(() => {
    setIsButtonAddEnabled(
      insuredForm.rut.isValid &&
        insuredForm.email.isValid &&
        insuredForm.phone.isValid &&
        insuredForm.rut.value !== "" &&
        insuredForm.birthDate.value !== "" &&
        insuredForm.name.value !== "" &&
        insuredForm.paternalLastName.value !== "" &&
        insuredForm.maternalLastName.value !== "" &&
        insuredForm.address.value !== "" &&
        insuredForm.district.value !== "" &&
        insuredForm.email.value !== "" &&
        insuredForm.phone.value !== ""
    );
  }, [insuredForm]);

  return (
    <Fragment>
      <Content>
        <ContentCell gap="5px">
          <Table width="1062px">
            <TableHeader>
              <TableCell width="70px" align="center">{`#`}</TableCell>
              <TableCell width="120px">Rut</TableCell>
              <TableCell width="500px">Nombre Completo</TableCell>
              <TableCell width="291px">Correo electrónico</TableCell>
              <TableCell width="60px"></TableCell>
              <TableCellEnd />
            </TableHeader>
            <TableDetail>
              {lead.insured.map((itemInsured: any, idx: number) => (
                <TableRow key={idx} className={"deleted"}>
                  <TableCell width="70px" align="center">
                    {idx + 1}
                  </TableCell>
                  <TableCell width="120px" align="right">
                    {itemInsured.rut}
                  </TableCell>
                  <TableCell width="500px">{`${itemInsured.name} ${itemInsured.paternalLastName} ${itemInsured.maternalLastName}`}</TableCell>
                  <TableCell width="291px">{itemInsured.email}</TableCell>
                  <TableCell width="60px" align="center">
                    <TableIcons>
                      <Icon
                        iconName="edit"
                        onClick={() => editInsured(itemInsured)}
                      />
                      <Icon
                        iconName="delete"
                        onClick={() => deleteInsured(itemInsured.rut)}
                      />
                    </TableIcons>
                  </TableCell>
                </TableRow>
              ))}
            </TableDetail>
          </Table>
          <ContentRow align="space-between">
            <ContentCellSummary>
              {lead.insured.length > 0 ? lead.insured.length : "Sin"}{" "}
              {lead.insured.length === 1 ? "beneficiario" : "beneficiarios"}
            </ContentCellSummary>
            <ContentRow gap="5px">
              <Button text="Excel" color="gray" />
              <ButtonIcon
                iconName="add"
                color="gray"
                onClick={handleClickNewInsured}
              />
            </ContentRow>
          </ContentRow>
        </ContentCell>
      </Content>
      <ModalWindow
        showModal={showModal}
        setClosed={handleCloseClick}
        title={`Beneficiario`}>
        <ContentCell align="center" gap="30px">
          <InsuredForm
            insuredForm={insuredForm}
            setInsuredForm={setInsuredForm}
            disabled={false}
          />
          <Button
            text="Registrar"
            width="150px"
            onClick={addInsured}
            enabled={isButtonAddEnabled}
          />
        </ContentCell>
      </ModalWindow>
    </Fragment>
  );
};

export default Insured;
