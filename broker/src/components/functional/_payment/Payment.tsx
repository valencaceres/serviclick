import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";

import {
  Table,
  TableCell,
  TableDetail,
  TableHeader,
  TableRow,
} from "../../ui/Table";
import ModalWindow from "../../ui/ModalWindow";
import ModalWarning from "../../ui/ModalWarning";
import InputText from "../../ui/InputText";
import { Content, ContentCell, ContentRow } from "../../layout/Content";

import texts from "../../../utils/texts";
import { calculateValidity } from "../../../utils/functions";

import { termsAndCondicions } from "../../../data/termsAndConditions";

import styles from "./Payment.module.scss";

import { useUI, useProduct, useLead, useBroker } from "../../../hooks";
import Icon from "../../ui/Icon";

const Payment = ({
  setIsButtonEnabled,
  showModalPaymentType,
  setShowModalPaymentType,
}: any) => {
  const router = useRouter();

  const { isDesktop, customerType } = useUI();
  const { product } = useProduct();
  const { lead } = useLead();
  const { broker } = useBroker();

  const customerTypeName = {
    P: "customer",
    C: "company",
  };

  const [showWarning, setShowWarning] = useState(false);

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
  const [message, setMessage] = useState("");

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
    const isValid: boolean =
      lead.product.id !== "" &&
      lead.product.price > 0 &&
      //lead.product.currency_code !== "" &&
      lead.product.frequency_code !== ""; //&&
    //lead.product.productPlan_id > 0;
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

  const handleClickClosePaymentType = () => {
    setShowModalPaymentType(false);
    setMessage("");
  };

  const handleClickInvoice = () => {
    setMessage("La solicitud de facturación ya fue registrada");
  };

  const handleClickLink = () => {
    setMessage("El link de pago ya fue enviado al cliente");
  };

  useEffect(() => {
    setIsButtonEnabled(
      customerType === "P"
        ? completeLeadCustomer()
        : completeLeadCompany() &&
            completeInsured() &&
            completeProduct() &&
            checks.company &&
            checks.insured &&
            checks.product &&
            checks.values &&
            checks.termsAndConditions
    );
  }, [checks]);

  return (
    <Fragment>
      <Content>
        <ContentCell align="center" gap="10px">
          <div className={styles.section}>
            <div className={styles.sectionTitle}>
              <input
                name="contractor"
                type="checkbox"
                onChange={(e) =>
                  handleClickCheck(e, customerTypeName[customerType])
                }
              />
              Datos del contratante
            </div>
            <div className={styles.sectionContent}>
              {customerType === "P" ? (
                <ContentRow gap="20px">
                  <ContentCell gap="5px" className={styles.textColumn}>
                    <ContentRow gap="5px">
                      <InputText
                        label="Rut"
                        width="100%"
                        maxLength={12}
                        value={lead.customer.rut}
                        onChange={() => {}}
                        disabled={true}
                      />
                      <InputText
                        label="Fecha de nacimiento"
                        type="date"
                        width="100%"
                        maxLength={10}
                        value={lead.customer.birthDate}
                        onChange={() => {}}
                        disabled={true}
                      />
                    </ContentRow>
                    <InputText
                      label="Razón Social"
                      width="100%"
                      maxLength={50}
                      value={lead.customer.name}
                      onChange={() => {}}
                      disabled={true}
                    />
                    <InputText
                      label="Representante Legal"
                      width="100%"
                      maxLength={50}
                      value={lead.customer.paternalLastName}
                      onChange={() => {}}
                      disabled={true}
                    />
                    <InputText
                      label="Giro"
                      width="100%"
                      maxLength={50}
                      value={lead.customer.maternalLastName}
                      onChange={() => {}}
                      disabled={true}
                    />
                  </ContentCell>
                  <ContentCell gap="5px" className={styles.textColumn}>
                    <InputText
                      label="Dirección"
                      width="100%"
                      maxLength={250}
                      value={lead.customer.address}
                      onChange={() => {}}
                      disabled={true}
                    />
                    <InputText
                      label="Comuna"
                      width="100%"
                      value={lead.customer.district}
                      onChange={() => {}}
                      disabled={true}
                    />
                    <InputText
                      label="Correo"
                      width="100%"
                      value={lead.customer.email}
                      onChange={() => {}}
                      disabled={true}
                    />
                    <InputText
                      label="Teléfono"
                      width="100%"
                      value={lead.customer.phone}
                      onChange={() => {}}
                      disabled={true}
                    />
                  </ContentCell>
                </ContentRow>
              ) : (
                <ContentRow gap="20px">
                  <ContentCell className={styles.textColumn} gap="5px">
                    <ContentRow gap="5px">
                      <InputText
                        label="Rut"
                        width="100%"
                        value={lead.company.rut}
                        onChange={() => {}}
                        disabled={true}
                      />
                      <div style={{ width: "100%" }}></div>
                    </ContentRow>
                    <InputText
                      label="Razón Social"
                      width="100%"
                      value={lead.company.companyName}
                      onChange={() => {}}
                      disabled={true}
                    />
                    <InputText
                      label="Representante Legal"
                      width="100%"
                      value={lead.company.legalRepresentative}
                      onChange={() => {}}
                      disabled={true}
                    />
                    <InputText
                      label="Giro"
                      width="100%"
                      value={lead.company.line}
                      onChange={() => {}}
                      disabled={true}
                    />
                  </ContentCell>
                  <ContentCell className={styles.textColumn} gap="5px">
                    <InputText
                      label="Dirección"
                      width="100%"
                      value={lead.company.address}
                      onChange={() => {}}
                      disabled={true}
                    />
                    <InputText
                      label="Comuna"
                      width="100%"
                      value={lead.company.district}
                      onChange={() => {}}
                      disabled={true}
                    />
                    <InputText
                      label="Correo"
                      width="100%"
                      value={lead.company.email}
                      onChange={() => {}}
                      disabled={true}
                    />
                    <InputText
                      label="Teléfono"
                      width="100%"
                      value={lead.company.phone}
                      onChange={() => {}}
                      disabled={true}
                    />
                  </ContentCell>
                </ContentRow>
              )}
            </div>
          </div>
          <div className={styles.section}>
            <div className={styles.sectionTitle}>
              <input
                name="product"
                type="checkbox"
                onChange={(e) => handleClickCheck(e, "product")}
              />
              Producto a contratar
            </div>
            <div className={styles.sectionContent}>
              <ContentCell gap="5px">
                <InputText
                  id="txtProductName"
                  label="Nombre"
                  width={isDesktop ? "940px" : "100%"}
                  value={product.name}
                  onChange={() => {}}
                  disabled={true}
                />
                <Table width="940px" height="auto">
                  <TableHeader>
                    <TableCell width="270px">Servicio</TableCell>
                    <TableCell width="160px">Monto</TableCell>
                    <TableCell width="250px">Límite</TableCell>
                    <TableCell width="70px" alt="Inicio de vigencia en díasx">
                      Inicio
                    </TableCell>
                    <TableCell width="176px">Eventos</TableCell>
                  </TableHeader>
                  <TableDetail>
                    {product.coverages.map((coverageItem: any, idx: number) => (
                      <TableRow key={idx}>
                        <TableCell width="270px">{coverageItem.name}</TableCell>
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
                    ))}
                  </TableDetail>
                </Table>
              </ContentCell>
            </div>
          </div>
          <div className={styles.section}>
            <div className={styles.sectionTitle}>
              <input
                name="insured"
                type="checkbox"
                onChange={(e) => handleClickCheck(e, "insured")}
              />
              Asegurados ({lead.insured.length})
            </div>
            <div className={styles.sectionContent}>
              {lead.insured && lead.insured.length > 0 ? (
                <Table width="940px" height={`auto`}>
                  <TableHeader>
                    <TableCell width="140px">Rut</TableCell>
                    <TableCell width="364px">Nombre completo</TableCell>
                    <TableCell width="300px">Correo Electrónico</TableCell>
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
                <div className={styles.message}>
                  <div className={styles.text1}>Pendientes por ingresar</div>
                  <div className={styles.text2}>
                    No podrá realizar el pago del servicio si no ha ingresado
                    los asegurados.
                  </div>
                </div>
              )}
            </div>
          </div>
          {customerType === "P" && product.beneficiaries > 0 && (
            <div className={styles.section}>
              <div className={styles.sectionTitle}>
                <input
                  name="beneficiaries"
                  type="checkbox"
                  onChange={(e) => handleClickCheck(e, "beneficiaries")}
                />
                Beneficiarios{" "}
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
                  <Table
                    width="940px"
                    height={`${product.beneficiaries * 42 + 46}px`}>
                    <TableHeader>
                      <TableCell width="130px">Rut</TableCell>
                      <TableCell width="374px">Nombre completo</TableCell>
                      <TableCell width="300px">Correo Electrónico</TableCell>
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
                              {beneficiary.name} {beneficiary.paternalLastName}{" "}
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
                  <div className={styles.message}>
                    <div className={styles.text1}>Pendientes por ingresar</div>
                    <div className={styles.text2}>
                      Recibirá un correo electrónico con las instrucciones para
                      ingresarlos posteriormente. Recuerde que puede ingresar
                      hasta {product.beneficiaries} beneficiarios a su producto
                      contratado
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          <div className={styles.section}>
            <div className={styles.sectionTitle}>
              <input
                name="price"
                type="checkbox"
                onChange={(e) => handleClickCheck(e, "values")}
              />
              Valores y plazos
            </div>
            <div className={styles.sectionContent}>
              <ContentCell gap="5px">
                <ContentRow gap="5px">
                  <ContentCell gap="5px">
                    <InputText
                      id="txtStartValidity"
                      type="date"
                      label="Inicio de vigencia"
                      width="200px"
                      value={startValidity}
                      disabled={true}
                    />
                    <InputText
                      id="txtTerm"
                      label="Duración"
                      width={isDesktop ? "300px" : "200px"}
                      value={`${product.term} meses`}
                      disabled={true}
                    />
                  </ContentCell>
                  <ContentCell gap="5px">
                    <InputText
                      id="txtProductCompanyPrice"
                      label="Valor ($)"
                      width="200px"
                      value={(
                        product.price[
                          customerType === "P" ? "customer" : "company"
                        ] * lead.insured.length
                      )
                        .toLocaleString("en-US")
                        .replace(",", ".")}
                      disabled={true}
                    />
                    <InputText
                      id="txtProductFrecuency"
                      label="Frecuencia"
                      width={isDesktop ? "300px" : "200px"}
                      value={frequency[product.frequency]}
                      disabled={true}
                    />
                  </ContentCell>
                </ContentRow>
                <ContentRow gap="5px">
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
                    <a href="#" onClick={handleClickTermsAndConditions}>
                      Términos y Condiciones
                    </a>
                  </div>
                </ContentRow>
              </ContentCell>
            </div>
          </div>
        </ContentCell>
      </Content>
      <ModalWindow
        showModal={showModalTermsAndConditions}
        title="Términos y Condiciones"
        setClosed={handleCloseTermsAndConditions}>
        <div className={styles.termsAndConditions}>
          {termsAndCondicions.data}
        </div>
      </ModalWindow>
      <ModalWindow
        showModal={showModalPaymentType}
        setClosed={handleClickClosePaymentType}
        title="Forma de pago">
        {message === "" ? (
          <div className={styles.menuModal}>
            <div className={styles.menuOption} onClick={handleClickInvoice}>
              <Icon iconName="description" size="40px" />
              Facturación directa
            </div>
            <div className={styles.menuOption} onClick={handleClickLink}>
              <Icon iconName="outgoing_mail" size="40px" />
              Envío de link de pago
            </div>
          </div>
        ) : (
          <p>{message}</p>
        )}
      </ModalWindow>
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
