import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";

import HeadPages from "../../../layout/HeadPages";
import Wizard, { Title, Content, Buttons } from "../../../layout/Wizard";

import {
  Table,
  TableHeader,
  TableDetail,
  TableRow,
  TableCell,
  TableIcons,
} from "../../../ui/Table";
import Button from "../../../ui/Button";
import ButtonIcon from "../../../ui/ButtonIcon";
import Navigate, { Back } from "../../../ui/Navigate";
import Tooltip from "../../../ui/Tooltip";
import { Modal, Window } from "../../../ui/Modal";
import Icon from "../../../ui/Icon";

import ProductBadge from "../../ProductBadge";
import BeneficiaryDetail from "./BeneficiaryDetail";

import texts from "../../../../utils/texts";

import { useUI, useProduct, useLead } from "../../../../redux/hooks";

import styles from "./Beneficiary.module.scss";

const Beneficiary = ({ register }: any) => {
  const router = useRouter();

  const { isDesktop } = useUI();
  const { product } = useProduct();
  const { setLeadInsured, lead } = useLead();

  const initialDataBeneficiaryForm = {
    rut: { value: "", isValid: true },
    name: { value: "", isValid: true },
    paternalLastName: { value: "", isValid: true },
    maternalLastName: { value: "", isValid: true },
    birthDate: { value: "", isValid: true },
    address: { value: lead.customer.address, isValid: true },
    district: { value: lead.customer.district, isValid: true },
    email: { value: "", isValid: true },
    phone: { value: "", isValid: true },
  };

  const [beneficiaryForm, setBeneficiaryForm] = useState(
    initialDataBeneficiaryForm
  );
  const [showTooltip, setShowTooltip] = useState(true);
  const [showModalBeneficiary, setShowModalBeneficiary] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);

  const { Beneficiary: BeneficiaryText } = texts;

  const skip = () => {
    router.push(router.asPath.replace("beneficiary", "payment"));
  };

  const registerBeneficiary = () => {
    setLeadInsured([
      {
        ...lead.insured[0],
        beneficiaries: [
          ...lead.insured[0].beneficiaries.filter(
            (beneficiary) => beneficiary.rut !== beneficiaryForm.rut.value
          ),
          {
            id: "",
            rut: beneficiaryForm.rut.value,
            name: beneficiaryForm.name.value,
            paternalLastName: beneficiaryForm.paternalLastName.value,
            maternalLastName: beneficiaryForm.maternalLastName.value,
            birthDate: beneficiaryForm.birthDate.value,
            address: beneficiaryForm.address.value,
            district: beneficiaryForm.district.value,
            email: beneficiaryForm.email.value,
            phone: beneficiaryForm.phone.value,
          },
        ],
      },
    ]);

    handleCloseBeneficiary();
  };

  const handleCloseTooltip = () => {
    setShowTooltip(false);
  };

  const handleClickBack = () => {
    router.push(router.asPath.replace("beneficiary", "contract"));
  };

  const handleClickAdd = () => {
    handleCloseTooltip();
    setBeneficiaryForm(initialDataBeneficiaryForm);
    setShowModalBeneficiary(true);
  };

  const handleCloseBeneficiary = () => {
    setShowModalBeneficiary(false);
  };

  const handleClickEdit = (beneficiary: any) => {
    setBeneficiaryForm({
      rut: { value: beneficiary.rut, isValid: true },
      name: { value: beneficiary.name, isValid: true },
      paternalLastName: { value: beneficiary.paternalLastName, isValid: true },
      maternalLastName: { value: beneficiary.maternalLastName, isValid: true },
      birthDate: { value: beneficiary.birthDate, isValid: true },
      address: { value: beneficiary.address, isValid: true },
      district: { value: beneficiary.district, isValid: true },
      email: { value: beneficiary.email, isValid: true },
      phone: { value: beneficiary.phone, isValid: true },
    });
    setShowModalBeneficiary(true);
  };

  const handleClickDelete = (beneficiary: any) => {
    setLeadInsured([
      {
        ...lead.insured[0],
        beneficiaries: [
          ...lead.insured[0].beneficiaries.filter(
            (item) => item.rut !== beneficiary.rut
          ),
        ],
      },
    ]);
  };

  useEffect(() => {
    if (lead.insured.length > 0) {
      if (lead.insured[0].beneficiaries.length === product.beneficiaries) {
        setIsEnabled(false);
      }
    }
  }, [lead.insured, product.beneficiaries]);

  return (
    <Fragment>
      <HeadPages
        title="Beneficiarios"
        description="Datos de los beneficiarios"
      />
      <Wizard>
        <Title>
          <Navigate>
            <Back onClick={handleClickBack} />
          </Navigate>
          {BeneficiaryText.title}
          <ProductBadge />
        </Title>
        <Content>
          {lead.insured &&
          lead.insured.length > 0 &&
          lead.insured[0].beneficiaries.length > 0 ? (
            isDesktop ? (
              <Table
                width="1034px"
                height={`${product.beneficiaries * 42 + 46}px`}>
                <TableHeader>
                  <TableCell width="140px">Rut</TableCell>
                  <TableCell width="364px">Nombre completo</TableCell>
                  <TableCell width="300px">Correo Electrónico</TableCell>
                  <TableCell width="218px">Teléfono</TableCell>
                </TableHeader>
                <TableDetail>
                  {lead.insured[0].beneficiaries.map(
                    (beneficiary: any, idx: number) => (
                      <TableRow key={idx}>
                        <TableCell width="140px" align="flex-end">
                          {beneficiary.rut}
                        </TableCell>
                        <TableCell width="364px">
                          {beneficiary.name} {beneficiary.paternalLastName}{" "}
                          {beneficiary.maternalLastName}
                        </TableCell>
                        <TableCell width="300px" align="center">
                          {beneficiary.email}
                        </TableCell>
                        <TableCell width="210px">
                          {beneficiary.phone}
                          <TableIcons>
                            <Icon
                              iconName="edit"
                              onClick={() => handleClickEdit(beneficiary)}
                              className={styles.tableIcon}
                            />
                            <Icon
                              iconName="delete"
                              onClick={() => handleClickDelete(beneficiary)}
                              className={styles.tableIcon}
                            />
                          </TableIcons>
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </TableDetail>
              </Table>
            ) : (
              <Table width="90%" height={`calc(100vh - 350px)`}>
                <TableHeader>
                  <TableCell width="100%">Beneficiario</TableCell>
                </TableHeader>
                <TableDetail>
                  {lead.insured[0].beneficiaries.map(
                    (beneficiary: any, idx: number) => (
                      <TableRow key={idx}>
                        <TableCell width="100%" align="flex-start">
                          <div style={{ width: "100%" }}>
                            {beneficiary.rut}
                            <br />
                            {`${beneficiary.name} ${beneficiary.paternalLastName} ${beneficiary.maternalLastName}`}
                            <br />
                            {beneficiary.email}
                            <br />
                            {beneficiary.phone}
                          </div>
                          <TableIcons>
                            <Icon
                              iconName="edit"
                              onClick={() => handleClickEdit(beneficiary)}
                              className={styles.tableIcon}
                            />
                            <Icon
                              iconName="delete"
                              onClick={() => handleClickDelete(beneficiary)}
                              className={styles.tableIcon}
                            />
                          </TableIcons>
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </TableDetail>
              </Table>
            )
          ) : (
            <div className={styles.messageContent}>
              <div className={styles.messageWindow}>
                <div className={styles.text1}>
                  Presione el botón (+) para ingresar beneficiarios
                </div>
                <div className={styles.text2}>
                  (si lo prefiere, puede presionar el botón <b>Omitir</b> para
                  realizarlo en otra ocasión)
                </div>
              </div>
            </div>
          )}
          <ButtonIcon
            iconName="add"
            onClick={handleClickAdd}
            disabled={!isEnabled}
          />
        </Content>
        <Buttons>
          <Button onClick={skip} text="Omitir" width="150px" />
          <Button
            onClick={register}
            text="Registrar"
            width="150px"
            enabled={
              lead.insured.length > 0 &&
              lead.insured[0].beneficiaries.length > 0
            }
          />
        </Buttons>
      </Wizard>
      <Tooltip isShow={showTooltip} onClose={handleCloseTooltip}>
        <div>
          Este servicio te permite ingresar hasta{" "}
          <b>{product.beneficiaries} beneficiarios</b>, para ello debes
          presionar el botón (+)
          <br />
          <br />
          Si no tienes los datos, puedes presionar el botón <b>Omitir</b> para
          realizarlo en otra ocasión, ya que se te enviará un correo electrónico
          para que puedas ingresar a nuestra plataforma.
        </div>
      </Tooltip>
      <Modal showModal={showModalBeneficiary}>
        <Window title="Beneficiario" setClosed={handleCloseBeneficiary}>
          <BeneficiaryDetail
            beneficiaryForm={beneficiaryForm}
            setBeneficiaryForm={setBeneficiaryForm}
            register={registerBeneficiary}
          />
        </Window>
      </Modal>
    </Fragment>
  );
};

export default Beneficiary;
