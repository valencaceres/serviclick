import { useState, useEffect, Fragment } from "react";

import BeneficiaryForm from "./BeneficiaryForm";

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

import { useBeneficiary } from "../../../hooks";
import ButtonIcon from "../../ui/ButtonIcon";
import Button from "../../ui/Button";
import ModalWindow from "../../ui/ModalWindow";

type ValueT = {
  value: string;
  isValid: boolean;
};

type BeneficiaryFormT = {
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

type BeneficiaryT = {
  beneficiaryForm: BeneficiaryFormT;
  setBeneficiaryForm: any;
  addBeneficiary: any;
  showModal: boolean;
  setShowModal: any;
  editBeneficiary: any;
  deleteBeneficiary: any;
};

const Beneficiary = ({
  beneficiaryForm,
  setBeneficiaryForm,
  addBeneficiary,
  showModal,
  setShowModal,
  editBeneficiary,
  deleteBeneficiary,
}: BeneficiaryT) => {
  const { list: beneficiaryList } = useBeneficiary();

  const initialDataBeneficiary = {
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

  const handleClickNewBeneficiary = () => {
    setBeneficiaryForm(initialDataBeneficiary);
    setShowModal(true);
  };

  const handleCloseClick = () => {
    setShowModal(false);
  };

  useEffect(() => {
    setIsButtonAddEnabled(
      beneficiaryForm.rut.isValid &&
        beneficiaryForm.email.isValid &&
        beneficiaryForm.phone.isValid &&
        beneficiaryForm.rut.value !== "" &&
        beneficiaryForm.birthDate.value !== "" &&
        beneficiaryForm.name.value !== "" &&
        beneficiaryForm.paternalLastName.value !== "" &&
        beneficiaryForm.maternalLastName.value !== "" &&
        beneficiaryForm.address.value !== "" &&
        beneficiaryForm.district.value !== "" &&
        beneficiaryForm.email.value !== "" &&
        beneficiaryForm.phone.value !== ""
    );
  }, [beneficiaryForm]);

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
              {beneficiaryList.map((itemBeneficiary: any, idx: number) => (
                <TableRow key={idx} className={"deleted"}>
                  <TableCell width="70px" align="center">
                    {idx + 1}
                  </TableCell>
                  <TableCell width="120px" align="right">
                    {itemBeneficiary.rut}
                  </TableCell>
                  <TableCell width="500px">{`${itemBeneficiary.name} ${itemBeneficiary.paternalLastName} ${itemBeneficiary.maternalLastName}`}</TableCell>
                  <TableCell width="291px">{itemBeneficiary.email}</TableCell>
                  <TableCell width="60px" align="center">
                    <TableIcons>
                      <Icon
                        iconName="edit"
                        onClick={() => editBeneficiary(itemBeneficiary)}
                      />
                      <Icon
                        iconName="delete"
                        onClick={() => deleteBeneficiary(itemBeneficiary.rut)}
                      />
                    </TableIcons>
                  </TableCell>
                </TableRow>
              ))}
            </TableDetail>
          </Table>
          <ContentRow align="space-between">
            <ContentCellSummary>
              {beneficiaryList.length > 0 ? beneficiaryList.length : "Sin"}{" "}
              {beneficiaryList.length === 1 ? "beneficiario" : "beneficiarios"}
            </ContentCellSummary>
            <ContentRow gap="5px">
              <ButtonIcon
                iconName="add"
                color="gray"
                onClick={handleClickNewBeneficiary}
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
          <BeneficiaryForm
            beneficiaryForm={beneficiaryForm}
            setBeneficiaryForm={setBeneficiaryForm}
            disabled={false}
          />
          <Button
            text="Registrar"
            width="150px"
            onClick={addBeneficiary}
            enabled={isButtonAddEnabled}
          />
        </ContentCell>
      </ModalWindow>
    </Fragment>
  );
};

export default Beneficiary;
