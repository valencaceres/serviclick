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
import InsuredDetail from "./InsuredDetail";

import texts from "../../../../utils/texts";

import { useUI, useLead } from "../../../../redux/hooks";

import styles from "./Insured.module.scss";

const Insured = ({ register }: any) => {
  const router = useRouter();

  const { lead, setLeadInsured } = useLead();
  const { isDesktop } = useUI();

  const initialDataInsuredForm = {
    rut: { value: "", isValid: true },
    name: { value: "", isValid: true },
    paternalLastName: { value: "", isValid: true },
    maternalLastName: { value: "", isValid: true },
    birthDate: { value: "", isValid: true },
    address: { value: "", isValid: true },
    district: { value: "", isValid: true },
    email: { value: "", isValid: true },
    phone: { value: "", isValid: true },
  };

  const [insuredForm, setInsuredForm] = useState(initialDataInsuredForm);
  const [showTooltip, setShowTooltip] = useState(true);
  const [showModalInsured, setShowModalInsured] = useState(false);

  const { Insured: InsuredText } = texts;

  const registerInsured = () => {
    setLeadInsured([
      ...lead.insured.filter((item) => item.rut !== insuredForm.rut.value),
      {
        id: "",
        rut: insuredForm.rut.value,
        name: insuredForm.name.value,
        paternalLastName: insuredForm.paternalLastName.value,
        maternalLastName: insuredForm.maternalLastName.value,
        birthDate: insuredForm.birthDate.value,
        address: insuredForm.address.value,
        district: insuredForm.district.value,
        email: insuredForm.email.value,
        phone: insuredForm.phone.value,
        beneficiaries: [],
      },
    ]);

    handleCloseInsured();
  };

  const handleCloseTooltip = () => {
    setShowTooltip(false);
  };

  const handleClickBack = () => {
    router.push(router.asPath.replace("insured", "contract"));
  };

  const handleClickAdd = () => {
    handleCloseTooltip();
    setInsuredForm(initialDataInsuredForm);
    setShowModalInsured(true);
  };

  const handleCloseInsured = () => {
    setShowModalInsured(false);
  };

  const handleClickEdit = (insured: any) => {
    setInsuredForm({
      rut: { value: insured.rut, isValid: true },
      name: { value: insured.name, isValid: true },
      paternalLastName: { value: insured.paternalLastName, isValid: true },
      maternalLastName: { value: insured.maternalLastName, isValid: true },
      birthDate: { value: insured.birthDate, isValid: true },
      address: { value: insured.address, isValid: true },
      district: { value: insured.district, isValid: true },
      email: { value: insured.email, isValid: true },
      phone: { value: insured.phone, isValid: true },
    });
    setShowModalInsured(true);
  };

  const handleClickDelete = (insured: any) => {
    setLeadInsured([
      ...lead.insured.filter((item) => item.rut !== insured.rut),
    ]);
  };

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
          {InsuredText.title}
          <ProductBadge />
        </Title>
        <Content>
          {lead.insured && lead.insured.length > 0 ? (
            isDesktop ? (
              <Table width="1034px" height={`calc(100vh - 230px)`}>
                <TableHeader>
                  <TableCell width="140px">Rut</TableCell>
                  <TableCell width="364px">Nombre completo</TableCell>
                  <TableCell width="300px">Correo Electrónico</TableCell>
                  <TableCell width="218px">Teléfono</TableCell>
                </TableHeader>
                <TableDetail>
                  {lead.insured.map((item: any, idx: number) => (
                    <TableRow key={idx}>
                      <TableCell width="140px" align="flex-end">
                        {item.rut}
                      </TableCell>
                      <TableCell width="364px">
                        {item.name} {item.paternalLastName}{" "}
                        {item.maternalLastName}
                      </TableCell>
                      <TableCell width="300px" align="center">
                        {item.email}
                      </TableCell>
                      <TableCell width="210px">
                        {item.phone}
                        <TableIcons>
                          <Icon
                            iconName="edit"
                            onClick={() => handleClickEdit(item)}
                            className={styles.tableIcon}
                          />
                          <Icon
                            iconName="delete"
                            onClick={() => handleClickDelete(item)}
                            className={styles.tableIcon}
                          />
                        </TableIcons>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableDetail>
              </Table>
            ) : (
              <Table width="90%" height={`calc(100vh - 350px)`}>
                <TableHeader>
                  <TableCell width="100%">Beneficiario</TableCell>
                </TableHeader>
                <TableDetail>
                  {lead.insured.map((item: any, idx: number) => (
                    <TableRow key={idx}>
                      <TableCell width="100%" align="flex-start">
                        <div style={{ width: "100%" }}>
                          {item.rut}
                          <br />
                          {`${item.name} ${item.paternalLastName} ${item.maternalLastName}`}
                          <br />
                          {item.email}
                          <br />
                          {item.phone}
                        </div>
                        <TableIcons>
                          <Icon
                            iconName="edit"
                            onClick={() => handleClickEdit(item)}
                            className={styles.tableIcon}
                          />
                          <Icon
                            iconName="delete"
                            onClick={() => handleClickDelete(item)}
                            className={styles.tableIcon}
                          />
                        </TableIcons>
                      </TableCell>
                    </TableRow>
                  ))}
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
                  (si lo prefiere, puede subir una planilla Excel presionando el
                  botón)
                </div>
              </div>
            </div>
          )}
          <ButtonIcon iconName="add" onClick={handleClickAdd} />
        </Content>
        <Buttons>
          <Button
            onClick={register}
            text="Registrar"
            width="150px"
            enabled={lead.insured.length > 0}
          />
        </Buttons>
      </Wizard>
      <Tooltip isShow={showTooltip} onClose={handleCloseTooltip}>
        <div>
          Este servicio te permite ingresar los beneficiarios que desees, para
          ello debes presionar el botón (+) o subirlos mediante una planilla
          Excel.
        </div>
      </Tooltip>
      <Modal showModal={showModalInsured}>
        <Window title="Beneficiario" setClosed={handleCloseInsured}>
          <InsuredDetail
            insuredForm={insuredForm}
            setInsuredForm={setInsuredForm}
            register={registerInsured}
          />
        </Window>
      </Modal>
    </Fragment>
  );
};

export default Insured;
