import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";

import Wizard, { Title, Content, Buttons } from "../../layout/Wizard";

import {
  Table,
  TableHeader,
  TableDetail,
  TableRow,
  TableCell,
  TableIcons,
} from "../../ui/Table";
import Button from "../../ui/Button";
import ButtonIcon from "../../ui/ButtonIcon";
import Navigate, { Back } from "../../ui/Navigate";
import Tooltip from "../../ui/Tooltip";
import { Modal, Window } from "../../ui/Modal";
import Icon from "../../ui/Icon";

import BeneficiaryDetail from "./BeneficiaryDetail";

import { setSession } from "../../../redux/slices/userInsuredSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

import styles from "./Beneficiary.module.scss";

const Beneficiary = ({ setShowTooltip }: any) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { isDesktop } = useAppSelector((state) => state.uiSlice);
  const { session } = useAppSelector((state) => state.userInsuredSlice);

  const initialDataBeneficiaryForm = {
    rut: { value: "", isValid: true },
    name: { value: "", isValid: true },
    paternalLastName: { value: "", isValid: true },
    maternalLastName: { value: "", isValid: true },
    email: { value: "", isValid: true },
    phone: { value: "", isValid: true },
  };

  const [beneficiaryForm, setBeneficiaryForm] = useState(
    initialDataBeneficiaryForm
  );

  const [showModalBeneficiary, setShowModalBeneficiary] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);

  const skip = () => {
    router.push(router.asPath.replace("beneficiary", "payment"));
  };

  const registerBeneficiary = () => {
    dispatch(
      setSession({
        ...session,
        beneficiaries: [
          ...session.beneficiaries.filter(
            (beneficiary) => beneficiary.rut !== beneficiaryForm.rut.value
          ),
          {
            id: "",
            rut: beneficiaryForm.rut.value,
            name: beneficiaryForm.name.value,
            paternalLastName: beneficiaryForm.paternalLastName.value,
            maternalLastName: beneficiaryForm.maternalLastName.value,
            email: beneficiaryForm.email.value,
            phone: beneficiaryForm.phone.value,
          },
        ],
      })
    );

    handleCloseBeneficiary();
  };

  const handleCloseTooltip = () => {
    setShowTooltip(false);
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
      email: { value: beneficiary.email, isValid: true },
      phone: { value: beneficiary.phone, isValid: true },
    });
    setShowModalBeneficiary(true);
  };

  const handleClickDelete = (beneficiary: any) => {
    dispatch(
      setSession({
        ...session,
        beneficiaries: [
          ...session.beneficiaries.filter(
            (item) => item.rut !== beneficiary.rut
          ),
        ],
      })
    );
  };

  useEffect(() => {
    setIsEnabled(session.beneficiaries.length !== session.numberBeneficiaries);
  }, [session]);

  return (
    <Fragment>
      {session.beneficiaries.length > 0 ? (
        isDesktop ? (
          <Table
            width="1034px"
            height={`${session.numberBeneficiaries * 42 + 46}px`}
          >
            <TableHeader>
              <TableCell width="140px">Rut</TableCell>
              <TableCell width="364px">Nombre completo</TableCell>
              <TableCell width="300px">Correo Electrónico</TableCell>
              <TableCell width="218px">Teléfono</TableCell>
            </TableHeader>
            <TableDetail>
              {session.beneficiaries.map((beneficiary: any, idx: number) => (
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
              ))}
            </TableDetail>
          </Table>
        ) : (
          <Table width="90%" height={`calc(100vh - 350px)`}>
            <TableHeader>
              <TableCell width="100%">Beneficiario</TableCell>
            </TableHeader>
            <TableDetail>
              {session.beneficiaries.map((beneficiary: any, idx: number) => (
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
