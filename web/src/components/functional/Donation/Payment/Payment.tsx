import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";

import Wizard, { Title, Content, Buttons } from "../../../layout/Wizard";
import { Component, Row, Cell, CellCenter } from "../../../layout/Component";

import Button from "../../../ui/Button";
import InputText from "../../../ui/InputText";
import Navigate, { Back } from "../../../ui/Navigate";
import Tooltip from "../../../ui/Tooltip";

import DonorForm from "../Donor/DonorForm";

import texts from "../../../../utils/texts";

import DonationBadge from "../../DonationBadge";

import { useAppSelector } from "../../../../redux/hooks";

import styles from "./Payment.module.scss";

import { useUI, useProduct, useDonation } from "../../../../redux/hooks";

const Payment = ({ register }: any) => {
  const router = useRouter();

  const { isDesktop } = useUI();
  const { product } = useProduct();
  const { donation, createDonation } = useDonation();

  const { stage } = useAppSelector((state) => state.stageSlice);

  const initialDataDonorForm = {
    rut: { value: donation.donor.rut, isValid: true },
    name: { value: donation.donor.name, isValid: true },
    paternalLastName: {
      value: donation.donor.paternalLastName,
      isValid: true,
    },
    maternalLastName: {
      value: donation.donor.maternalLastName,
      isValid: true,
    },
    birthDate: { value: donation.donor.birthDate, isValid: true },
    address: { value: donation.donor.address, isValid: true },
    district: { value: donation.donor.district, isValid: true },
    email: { value: donation.donor.email, isValid: true },
    phone: { value: donation.donor.phone, isValid: true },
  };

  const initialDataSectionSelected = {
    donor: false,
    price: false,
  };

  const [sectionSelected, setSectionSelected] = useState(
    initialDataSectionSelected
  );
  const [donorForm, setDonorForm] = useState(initialDataDonorForm);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [checks, setChecks] = useState({
    donor: false,
    values: false,
  });
  const [completeChecks, setCompleteChecks] = useState(false);

  const { payment: paymentText, frequency } = texts;

  const completeDonationDonor = () => {
    const isValid: boolean =
      donation.donor.rut !== "" &&
      donation.donor.name !== "" &&
      donation.donor.paternalLastName !== "" &&
      donation.donor.maternalLastName !== "" &&
      donation.donor.birthDate !== "" &&
      donation.donor.address !== "" &&
      donation.donor.district !== "" &&
      donation.donor.email !== "" &&
      donation.donor.phone !== "";
    return isValid;
  };

  const completeProduct = () => {
    const isValid: boolean = donation.product_id !== "" && donation.price > 0;
    return isValid;
  };

  const handleCloseTooltip = () => {
    setShowTooltip(false);
  };

  const handleClickBack = () => {
    router.back();
  };

  const handleClickRegister = () => {
    setIsLoading(true);
    createDonation(donation);
  };

  const handleClickCheck = (e: any, check: string) => {
    setSectionSelected({
      ...sectionSelected,
      [e.target.name]: e.target.checked,
    });
    setChecks({ ...checks, [check]: e.target.checked });
  };

  useEffect(() => {
    setCompleteChecks(checks.donor && checks.values);
  }, [checks, product.beneficiaries, stage.type]);

  useEffect(() => {
    setIsEnabled(
      completeDonationDonor() && completeProduct() && completeChecks
    );
    if (donation.subscription_id > 0) {
      register();
    }
  }, [completeDonationDonor, completeProduct, completeChecks, donation]);

  return (
    <Fragment>
      <Wizard>
        <Title>
          <Navigate>
            <Back onClick={handleClickBack} />
          </Navigate>
          {paymentText.title}
          <DonationBadge />
        </Title>
        <Content>
          <Component width={isDesktop ? "1200px" : "100%"}>
            <Row>
              <Cell>
                <div
                  className={
                    styles.section +
                    " " +
                    (sectionSelected.donor ? styles.selected + " " : "") +
                    styles.contractor
                  }>
                  <div className={styles.sectionTitle}>
                    <input
                      name="donor"
                      type="checkbox"
                      onChange={(e) => handleClickCheck(e, "donor")}
                    />
                    &nbsp;&nbsp;Datos del donador
                  </div>
                  <div className={styles.sectionContent}>
                    <DonorForm
                      donorForm={donorForm}
                      setDonorForm={setDonorForm}
                      disabled={true}
                    />
                  </div>
                </div>
              </Cell>
            </Row>
            <Row>
              <Cell>
                <div
                  className={
                    styles.section +
                    " " +
                    (sectionSelected.price ? styles.selected + " " : "") +
                    styles.price
                  }>
                  <div className={styles.sectionTitle}>
                    <input
                      name="price"
                      type="checkbox"
                      onChange={(e) => handleClickCheck(e, "values")}
                    />
                    &nbsp;&nbsp;Datos de la donación
                  </div>
                  <div className={styles.sectionContent}>
                    <Component width={isDesktop ? "500px" : "100%"}>
                      <Row>
                        <Cell>
                          <CellCenter>
                            <InputText
                              id="txtTerm"
                              label="Donación"
                              width={isDesktop ? "470px" : "100%"}
                              value={`${product.name}`}
                              disabled={true}
                            />
                          </CellCenter>
                        </Cell>
                      </Row>
                      <Row>
                        <Cell>
                          <CellCenter>
                            <InputText
                              label="Valor ($)"
                              width={isDesktop ? "200px" : "100%"}
                              value={donation.price
                                .toLocaleString("en-US")
                                .replace(",", ".")}
                              disabled={true}
                            />
                          </CellCenter>
                        </Cell>
                        <Cell>
                          <CellCenter>
                            <InputText
                              id="txtProductFrecuency"
                              label="Frecuencia"
                              width={isDesktop ? "300px" : "100%"}
                              value={frequency[product.frequency]}
                              disabled={true}
                            />
                          </CellCenter>
                        </Cell>
                      </Row>
                    </Component>
                  </div>
                </div>
              </Cell>
            </Row>
          </Component>
        </Content>
        <Buttons>
          <Button
            onClick={handleClickRegister}
            text="Donar"
            width="150px"
            enabled={isEnabled}
            loading={isLoading}
          />
        </Buttons>
      </Wizard>
      <Tooltip isShow={showTooltip} onClose={handleCloseTooltip}>
        <div>
          Verifica que los datos ingresados sean los correctos, para ello te
          desplegamos la información de la donación que estás realizando, te
          pedimos que hagas click en el ckeck al lado de cada título.
          <br />
          <br />
          Si estás conforme, al terminar de checkear, presiona el botón{" "}
          <b>Donar</b> y te llevaremos a nuestra plataforma de pago seguro.
        </div>
      </Tooltip>
    </Fragment>
  );
};

export default Payment;
