import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";

import {
  Table,
  TableHeader,
  TableDetail,
  TableRow,
  TableCell,
  TableIcons,
} from "../../ui/Table";
import ButtonIcon from "../../ui/ButtonIcon";
import { Modal, Window } from "../../ui/Modal";
import Icon from "../../ui/Icon";

import InsuredDetail from "./InsuredDetail";

import { setSession } from "../../../redux/slices/userCompanySlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

import styles from "./Insured.module.scss";

const Insured = ({ setShowTooltip }: any) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { isDesktop } = useAppSelector((state) => state.uiSlice);
  const { session } = useAppSelector((state) => state.userCompanySlice);

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

  const [showModalInsured, setShowModalInsured] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);

  const registerInsured = () => {
    console.log({
      id: "",
      rut: insuredForm.rut.value,
      name: insuredForm.name.value,
      paternalLastName: insuredForm.paternalLastName.value,
      maternalLastName: insuredForm.maternalLastName.value,
      birthDate: insuredForm.birthDate.value,
      email: insuredForm.email.value,
      phone: insuredForm.phone.value,
    });
    dispatch(
      setSession({
        ...session,
        insured: [
          ...session.insured.filter(
            (insured) => insured.rut !== insuredForm.rut.value
          ),
          {
            id: "",
            rut: insuredForm.rut.value,
            name: insuredForm.name.value,
            paternalLastName: insuredForm.paternalLastName.value,
            maternalLastName: insuredForm.maternalLastName.value,
            birthDate: insuredForm.birthDate.value,
            email: insuredForm.email.value,
            phone: insuredForm.phone.value,
          },
        ],
      })
    );
    handleCloseInsured();
  };

  const handleCloseTooltip = () => {
    setShowTooltip(false);
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
      birthDate: { value: insured.birthDate || "", isValid: true },
      address: { value: insured.address, isValid: true },
      district: { value: insured.district, isValid: true },
      email: { value: insured.email, isValid: true },
      phone: { value: insured.phone, isValid: true },
    });
    setShowModalInsured(true);
  };

  const handleClickDelete = (insured: any) => {
    // dispatch(
    //   setSession({
    //     ...session,
    //     insured: [
    //       ...session.insured.filter((item) => item.rut !== insured.rut),
    //     ],
    //   })
    // );
  };

  return (
    <Fragment>
      {session.insured.length > 0 ? (
        isDesktop ? (
          <Table width="1034px">
            <TableHeader>
              <TableCell width="140px">Rut</TableCell>
              <TableCell width="364px">Nombre completo</TableCell>
              <TableCell width="300px">Correo Electrónico</TableCell>
              <TableCell width="218px">Teléfono</TableCell>
            </TableHeader>
            <TableDetail>
              {session.insured.map((insured: any, idx: number) => (
                <TableRow key={idx}>
                  <TableCell width="140px" align="flex-end">
                    {insured.rut}
                  </TableCell>
                  <TableCell width="364px">
                    {insured.name} {insured.paternalLastName}{" "}
                    {insured.maternalLastName}
                  </TableCell>
                  <TableCell width="300px" align="center">
                    {insured.email}
                  </TableCell>
                  <TableCell width="210px">
                    {insured.phone}
                    <TableIcons>
                      <Icon
                        iconName="edit"
                        onClick={() => handleClickEdit(insured)}
                        className={styles.tableIcon}
                      />
                      <Icon
                        iconName="delete"
                        onClick={() => handleClickDelete(insured)}
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
              <TableCell width="100%">Asegurado</TableCell>
            </TableHeader>
            <TableDetail>
              {session.insured.map((insured: any, idx: number) => (
                <TableRow key={idx}>
                  <TableCell width="100%" align="flex-start">
                    <div style={{ width: "100%" }}>
                      {insured.rut}
                      <br />
                      {`${insured.name} ${insured.paternalLastName} ${insured.maternalLastName}`}
                      <br />
                      {insured.email}
                      <br />
                      {insured.phone}
                    </div>
                    <TableIcons>
                      <Icon
                        iconName="edit"
                        onClick={() => handleClickEdit(insured)}
                        className={styles.tableIcon}
                      />
                      <Icon
                        iconName="delete"
                        onClick={() => handleClickDelete(insured)}
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
              Presione el botón (+) para ingresar asegurados
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
      <Modal showModal={showModalInsured}>
        <Window title="Asegurado" setClosed={handleCloseInsured}>
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
