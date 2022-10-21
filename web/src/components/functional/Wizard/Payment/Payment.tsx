import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";

import Wizard, { Title, Content, Buttons } from "../../../layout/Wizard";
import { Component, Row, Cell, CellCenter } from "../../../layout/Component";

import Button from "../../../ui/Button";
import InputText from "../../../ui/InputText";
import Navigate, { Back } from "../../../ui/Navigate";
import {
  Table,
  TableHeader,
  TableDetail,
  TableRow,
  TableCell,
} from "../../../ui/Table";
import Tooltip from "../../../ui/Tooltip";
import { Modal, Window } from "../../../ui/Modal";
import ModalWarning from "../../../ui/ModalWarning";

import { CustomerForm } from "../Customer";
import { CompanyForm } from "../Company";

import texts from "../../../../utils/texts";
import { calculateValidity } from "../../../../utils/functions";

import ProductBadge from "../../ProductBadge";

import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { createLead } from "../../../../redux/slices/leadSlice";

import { termsAndCondicions } from "../../../../data/termsAndConditions";

import styles from "./Payment.module.scss";

import { useUI } from "../../../../redux/hooks";

const Payment = ({ register }: any) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { agentId } = useUI();

  const { isDesktop } = useAppSelector((state) => state.uiSlice);
  const { product } = useAppSelector((state) => state.productSlice);
  const { stage } = useAppSelector((state) => state.stageSlice);
  const { lead } = useAppSelector((state) => state.leadSlice);

  const [showWarning, setShowWarning] = useState(false);

  const initialDataCustomerForm = {
    rut: { value: lead.customer.rut, isValid: true },
    name: { value: lead.customer.name, isValid: true },
    paternalLastName: { value: lead.customer.paternalLastName, isValid: true },
    maternalLastName: { value: lead.customer.maternalLastName, isValid: true },
    birthDate: { value: lead.customer.birthDate, isValid: true },
    address: { value: lead.customer.address, isValid: true },
    district: { value: lead.customer.district, isValid: true },
    email: { value: lead.customer.email, isValid: true },
    phone: { value: lead.customer.phone, isValid: true },
  };

  const initialDataCompanyForm = {
    rut: { value: lead.company.rut, isValid: true },
    companyName: { value: lead.company.companyName, isValid: true },
    legalRepresentative: {
      value: lead.company.legalRepresentative,
      isValid: true,
    },
    line: { value: lead.company.line, isValid: true },
    address: { value: lead.company.address, isValid: true },
    district: { value: lead.company.district, isValid: true },
    email: { value: lead.company.email, isValid: true },
    phone: { value: lead.company.phone, isValid: true },
  };

  const initialDataSectionSelected = {
    contractor: false,
    product: false,
    insured: false,
    beneficiaries: false,
    price: false,
  };

  const [sectionSelected, setSectionSelected] = useState(
    initialDataSectionSelected
  );
  const [startValidity, setStartValidity] = useState(
    calculateValidity(product.coverages)
  );
  const [customerForm, setCustomerForm] = useState(initialDataCustomerForm);
  const [companyForm, setCompanyForm] = useState(initialDataCompanyForm);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [checks, setChecks] = useState({
    customer: false,
    company: false,
    insured: false,
    product: false,
    beneficiaries: false,
    values: false,
    termsAndConditions: false,
  });
  const [showModalTermsAndConditions, setShowModalTermsAndConditions] =
    useState(false);
  const [completeChecks, setCompleteChecks] = useState(false);

  const contractor = lead[stage.type];

  const { payment: paymentText, frequency } = texts;

  const completeLeadCustomer = () => {
    const isValid: boolean =
      lead.customer.rut !== "" &&
      lead.customer.name !== "" &&
      lead.customer.paternalLastName !== "" &&
      lead.customer.maternalLastName !== "" &&
      lead.customer.birthDate !== "" &&
      lead.customer.address !== "" &&
      lead.customer.district !== "" &&
      lead.customer.email !== "" &&
      lead.customer.phone !== "";
    return isValid;
  };

  const completeLeadCompany = () => {
    const isValid: boolean =
      lead.company.rut !== "" &&
      lead.company.companyName !== "" &&
      lead.company.legalRepresentative !== "" &&
      lead.company.line !== "" &&
      lead.company.address !== "" &&
      lead.company.district !== "" &&
      lead.company.email !== "" &&
      lead.company.phone !== "";
    return isValid;
  };

  const completeProduct = () => {
    console.log(lead);
    const isValid: boolean =
      lead.product.id !== "" &&
      lead.product.price > 0 &&
      lead.product.currency_code !== "" &&
      lead.product.frequency_code !== "" &&
      lead.product.productPlan_id > 0;
    return isValid;
  };

  const completeInsured = () => {
    const isValid: boolean =
      lead.insured.length > 0 &&
      lead.insured[0].rut !== "" &&
      lead.insured[0].name !== "" &&
      lead.insured[0].paternalLastName !== "" &&
      lead.insured[0].maternalLastName !== "" &&
      lead.insured[0].birthDate !== "" &&
      lead.insured[0].address !== "" &&
      lead.insured[0].district !== "" &&
      lead.insured[0].email !== "" &&
      lead.insured[0].phone !== "";
    return isValid;
  };

  const handleCloseTooltip = () => {
    setShowTooltip(false);
  };

  const handleClickBack = () => {
    router.push(
      router.asPath.replace(
        "payment",
        stage.type === "customer"
          ? product.beneficiaries > 0
            ? "beneficiary"
            : "contract"
          : "insured"
      )
    );
  };

  const handleClickRegister = (send: boolean) => {
    setIsLoading(true);
    dispatch(createLead({ ...lead, agent_id: agentId }, send));
  };

  const handleClickTermsAndConditions = () => {
    setShowModalTermsAndConditions(true);
  };

  const handleClickCheck = (e: any, check: string) => {
    setSectionSelected({
      ...sectionSelected,
      [e.target.name]: e.target.checked,
    });
    setChecks({ ...checks, [check]: e.target.checked });
  };

  const handleCloseTermsAndConditions = () => {
    setShowModalTermsAndConditions(false);
  };

  useEffect(() => {
    if (stage.type === "customer") {
      setCompleteChecks(
        checks.customer &&
          ((product.beneficiaries > 0 && checks.beneficiaries) ||
            product.beneficiaries === 0) &&
          checks.product &&
          checks.values &&
          checks.termsAndConditions
      );
    } else {
      setCompleteChecks(
        checks.company &&
          checks.insured &&
          checks.product &&
          checks.values &&
          checks.termsAndConditions
      );
    }
  }, [checks, product.beneficiaries, stage.type]);

  useEffect(() => {
    setIsEnabled(
      (completeLeadCustomer() || completeLeadCompany()) &&
        completeProduct() &&
        completeInsured() &&
        completeChecks
    );
    if (lead.subscription && lead.subscription.id > 0) {
      register();
    }
    if (lead.id !== "" && !lead.subscription) {
      setIsLoading(false);
      setShowWarning(true);
      setTimeout(() => {
        router.push("/");
      }, 1000);
    }
  }, [
    completeLeadCustomer,
    completeLeadCompany,
    completeProduct,
    completeInsured,
    completeChecks,
    lead,
  ]);

  return (
    <Fragment>
      <Wizard>
        <Title>
          <Navigate>
            <Back onClick={handleClickBack} />
          </Navigate>
          {paymentText.title}
          <ProductBadge />
        </Title>
        <Content>
          <Component width={isDesktop ? "1200px" : "100%"}>
            <Row>
              <Cell>
                <div
                  className={
                    styles.section +
                    " " +
                    (sectionSelected.contractor ? styles.selected + " " : "") +
                    styles.contractor
                  }>
                  <div className={styles.sectionTitle}>
                    <input
                      name="contractor"
                      type="checkbox"
                      onChange={(e) => handleClickCheck(e, stage.type)}
                    />
                    &nbsp;&nbsp;Datos del contratante
                  </div>
                  <div className={styles.sectionContent}>
                    {stage.type === "customer" ? (
                      <CustomerForm
                        customerForm={customerForm}
                        setCustomerForm={setCustomerForm}
                        disabled={true}
                      />
                    ) : (
                      <CompanyForm
                        companyForm={companyForm}
                        setCompanyForm={setCompanyForm}
                        disabled={true}
                      />
                    )}
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
                    (sectionSelected.product ? styles.selected + " " : "") +
                    styles.product
                  }>
                  <div className={styles.sectionTitle}>
                    <input
                      name="product"
                      type="checkbox"
                      onChange={(e) => handleClickCheck(e, "product")}
                    />
                    &nbsp;&nbsp;Producto a contratar
                  </div>
                  <div className={styles.sectionContent}>
                    <InputText
                      id="txtProductName"
                      label="Nombre"
                      width={isDesktop ? "940px" : "100%"}
                      value={product.name}
                      onChange={() => {}}
                      disabled={true}
                    />
                    {isDesktop ? (
                      <Table width="940px" height="auto">
                        <TableHeader>
                          <TableCell width="270px">Servicio</TableCell>
                          <TableCell width="160px">Monto</TableCell>
                          <TableCell width="250px">Límite</TableCell>
                          <TableCell
                            width="70px"
                            alt="Inicio de vigencia en díasx">
                            Inicio
                          </TableCell>
                          <TableCell width="176px">Eventos</TableCell>
                        </TableHeader>
                        <TableDetail>
                          {product.coverages.map(
                            (coverageItem: any, idx: number) => (
                              <TableRow key={idx}>
                                <TableCell width="270px">
                                  {coverageItem.name}
                                </TableCell>
                                <TableCell width="160px" align="center">
                                  {coverageItem.amount}
                                </TableCell>
                                <TableCell width="250px">
                                  {coverageItem.maximum}
                                </TableCell>
                                <TableCell width="70px" align="flex-end">
                                  {coverageItem.lack}
                                </TableCell>
                                <TableCell width="170px" align="center">
                                  {coverageItem.events}
                                </TableCell>
                              </TableRow>
                            )
                          )}
                        </TableDetail>
                      </Table>
                    ) : (
                      <Table width="100%" height={`auto`}>
                        <TableHeader>
                          <TableCell width="100%">Cobertura</TableCell>
                        </TableHeader>
                        <TableDetail>
                          {product.coverages.map(
                            (coverageItem: any, idx: number) => (
                              <TableRow key={idx}>
                                <TableCell width="100%">
                                  <div
                                    style={{
                                      width: "calc(100% - 120px)",
                                      paddingRight: "10px",
                                    }}>
                                    <b>{coverageItem.name}</b>
                                  </div>
                                  <div style={{ width: "120px" }}>
                                    Monto: {coverageItem.amount}
                                    <br />
                                    Límite: {coverageItem.maximum}
                                    <br />
                                    Carencia: {coverageItem.lack}
                                    <br />
                                    Cant. eventos: {coverageItem.events}
                                  </div>
                                </TableCell>
                              </TableRow>
                            )
                          )}
                        </TableDetail>
                      </Table>
                    )}
                  </div>
                </div>
              </Cell>
            </Row>
            {stage.type === "company" && (
              <Row>
                <Cell>
                  <div
                    className={
                      styles.section +
                      " " +
                      (sectionSelected.insured ? styles.selected + " " : "") +
                      styles.insured
                    }>
                    <div className={styles.sectionTitle}>
                      <input
                        name="insured"
                        type="checkbox"
                        onChange={(e) => handleClickCheck(e, "insured")}
                      />
                      &nbsp;&nbsp;Asegurados ({lead.insured.length})
                    </div>
                    <div className={styles.sectionContent}>
                      {lead.insured && lead.insured.length > 0 ? (
                        isDesktop ? (
                          <Table width="940px" height={`auto`}>
                            <TableHeader>
                              <TableCell width="140px">Rut</TableCell>
                              <TableCell width="364px">
                                Nombre completo
                              </TableCell>
                              <TableCell width="300px">
                                Correo Electrónico
                              </TableCell>
                              <TableCell width="124px">Teléfono</TableCell>
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
                                  <TableCell width="120px" align="flex-end">
                                    {item.phone}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableDetail>
                          </Table>
                        ) : (
                          <Table width="100%" height={`auto`}>
                            <TableHeader>
                              <TableCell width="100%">Asegurado</TableCell>
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
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableDetail>
                          </Table>
                        )
                      ) : (
                        <div className={styles.message}>
                          <div className={styles.text1}>
                            Pendientes por ingresar
                          </div>
                          <div className={styles.text2}>
                            No podrá realizar el pago del servicio si no ha
                            ingresado los asegurados.
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Cell>
              </Row>
            )}
            {product.beneficiaries > 0 && stage.type === "customer" && (
              <Row>
                <Cell>
                  <div
                    className={
                      styles.section +
                      " " +
                      (sectionSelected.beneficiaries
                        ? styles.selected + " "
                        : "") +
                      styles.beneficiaries
                    }>
                    <div className={styles.sectionTitle}>
                      <input
                        name="beneficiaries"
                        type="checkbox"
                        onChange={(e) => handleClickCheck(e, "beneficiaries")}
                      />
                      &nbsp;&nbsp;Beneficiarios{" "}
                      {lead.insured &&
                      lead.insured.length > 0 &&
                      lead.insured[0].beneficiaries.length > 0
                        ? "(" + lead.insured[0]?.beneficiaries.length + ")"
                        : ""}
                    </div>
                    <div className={styles.sectionContent}>
                      {lead.insured &&
                      lead.insured.length > 0 &&
                      lead.insured[0].beneficiaries.length > 0 ? (
                        isDesktop ? (
                          <Table
                            width="940px"
                            height={`${product.beneficiaries * 42 + 46}px`}>
                            <TableHeader>
                              <TableCell width="130px">Rut</TableCell>
                              <TableCell width="374px">
                                Nombre completo
                              </TableCell>
                              <TableCell width="300px">
                                Correo Electrónico
                              </TableCell>
                              <TableCell width="124px">Teléfono</TableCell>
                            </TableHeader>
                            <TableDetail>
                              {lead.insured[0].beneficiaries.map(
                                (beneficiary: any, idx: number) => (
                                  <TableRow key={idx}>
                                    <TableCell width="130px" align="flex-end">
                                      {beneficiary.rut}
                                    </TableCell>
                                    <TableCell width="374px">
                                      {beneficiary.name}{" "}
                                      {beneficiary.paternalLastName}{" "}
                                      {beneficiary.maternalLastName}
                                    </TableCell>
                                    <TableCell width="300px" align="center">
                                      {beneficiary.email}
                                    </TableCell>
                                    <TableCell width="120px" align="flex-end">
                                      {beneficiary.phone}
                                    </TableCell>
                                  </TableRow>
                                )
                              )}
                            </TableDetail>
                          </Table>
                        ) : (
                          <Table width="100%" height={`auto`}>
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
                                    </TableCell>
                                  </TableRow>
                                )
                              )}
                            </TableDetail>
                          </Table>
                        )
                      ) : (
                        <div className={styles.message}>
                          <div className={styles.text1}>
                            Pendientes por ingresar
                          </div>
                          <div className={styles.text2}>
                            Recibirá un correo electrónico con las instrucciones
                            para ingresarlos posteriormente. Recuerde que puede
                            ingresar hasta {product.beneficiaries} beneficiarios
                            a su producto contratado
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Cell>
              </Row>
            )}
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
                    &nbsp;&nbsp;Valores y plazos
                  </div>
                  <div className={styles.sectionContent}>
                    <Component width={isDesktop ? "500px" : "auto"}>
                      <Row>
                        <Cell>
                          <CellCenter>
                            <InputText
                              id="txtStartValidity"
                              label="Inicio de vigencia"
                              width="200px"
                              value={startValidity}
                              disabled={true}
                            />
                          </CellCenter>
                        </Cell>
                        <Cell>
                          <CellCenter>
                            <InputText
                              id="txtTerm"
                              label="Duración"
                              width={isDesktop ? "300px" : "200px"}
                              value={`${product.term} meses`}
                              disabled={true}
                            />
                          </CellCenter>
                        </Cell>
                      </Row>
                      <Row>
                        <Cell>
                          <CellCenter>
                            <InputText
                              id="txtProductCompanyPrice"
                              label="Valor ($)"
                              width="200px"
                              value={(
                                product.price[stage.type] * lead.insured.length
                              )
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
                              width={isDesktop ? "300px" : "200px"}
                              value={frequency[product.frequency]}
                              disabled={true}
                            />
                          </CellCenter>
                        </Cell>
                      </Row>
                      <Row>
                        <Cell align="center">
                          <CellCenter>
                            <div style={{ marginTop: "15px" }}>
                              <input
                                name="termsAndConditions"
                                type="checkbox"
                                onChange={(e) =>
                                  handleClickCheck(e, "termsAndConditions")
                                }
                              />
                            </div>
                            <div
                              className={styles.termsAndConditionsLink}
                              style={{ marginTop: "15px" }}>
                              Acepta nuestros{" "}
                              <a
                                href="#"
                                onClick={handleClickTermsAndConditions}>
                                Términos y Condiciones
                              </a>
                            </div>
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
            onClick={() => handleClickRegister(false)}
            text="Pagar"
            width="150px"
            enabled={isEnabled}
            loading={isLoading}
          />
          <Button
            onClick={() => handleClickRegister(true)}
            text="Enviar"
            width="150px"
            enabled={isEnabled}
            loading={isLoading}
          />
        </Buttons>
      </Wizard>
      <Tooltip isShow={showTooltip} onClose={handleCloseTooltip}>
        <div>
          Verifica que los datos ingresados sean los correctos, para ello te
          desplegamos la información del servicio que estás contratanto, te
          pedimos que hagas click en el ckeck al lado de cada título.
          <br />
          <br />
          Si estás conforme, al terminar de checkear, presiona el botón{" "}
          <b>Pagar</b> y te llevaremos a nuestra plataforma de pago seguro.
        </div>
      </Tooltip>
      <Modal showModal={showModalTermsAndConditions}>
        <Window
          title="Términos y Condiciones"
          setClosed={handleCloseTermsAndConditions}>
          <div className={styles.termsAndConditions}>
            {termsAndCondicions.data}
          </div>
        </Window>
      </Modal>
      <ModalWarning
        showModal={showWarning}
        title="Aviso"
        message={`Link de pago enviado al correo del cliente`}
        setClosed={() => setShowWarning(false)}
        iconName="mail"
        color="blue"
        buttons={[{ text: "Aceptar", function: () => setShowWarning(false) }]}
      />
    </Fragment>
  );
};

export default Payment;
