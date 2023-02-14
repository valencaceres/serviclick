import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import PaymentSection from "./PaymentSection";
import PaymentPerson from "./PaymentPerson";
import PaymentInsured from "./PaymentInsured";
import PaymentCoverage from "./PaymentCoverage";
import PaymentProduct from "./PaymentProduct";
import PaymentBeneficiaries from "./PaymentBeneficiaries";
import PaymentTerms from "./PaymentTerms";
import PaymentType from "./PaymentType";

import { Screen, Content, Footer, Col, Row } from "../../../layout/Form";

import InfoText from "../../../ui/InfoText";
import Button from "../../../ui/Button/Button";
import Loading from "../../../ui/Loading";

import ModalWindow from "../../../ui/ModalWindow/index";

import { useProduct, useLead } from "../../../../hooks/store";

import styles from "./Payment.module.scss";

import { termsAndCondicions } from "../../../../data/termsAndConditions";
import { config } from "../../../../utils/config";

const Payment = () => {
  const router = useRouter();

  const paymentTypeData = [
    {
      iconName: "credit_card",
      text: "Pagar con tarjeta",
      description:
        "Accede a nuestra plataforma de pago seguro donde podrás utilizar la tarjeta bancaria de tu preferencia (crédito, débito o prepago)",
      onClick: () => handleClickCard(),
    },
    {
      iconName: "attach_email",
      text: "Link de pago",
      description:
        "Si lo prefieres, te enviamos un link a tu correo electrónico para que realices el pago de forma posterior (no tendrás que digitar nuevamente)",
      onClick: () => handleClickLink(),
    },
  ];
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const { lead, getById, create, isSuccess, isLoading, dataCreate } = useLead();
  const { product } = useProduct();

  const [isSelectedContractor, setIsSelectedContractor] = useState(false);
  const [isSelectedinsured, setIsSelectedinsured] = useState(false);
  const [isSelectedProduct, setIsSelectedProduct] = useState(false);
  const [isSelectedBeneficiaries, setIsSelectedBeneficiaries] = useState(false);
  const [isSelectedPayment, setIsSelectedPayment] = useState(false);
  const [isSelectedTerms, setIsSelectedTerms] = useState(false);

  const [showTerms, setShowTerms] = useState(false);
  const [showPaymentType, setShowPaymentType] = useState(false);
  const [paymentType, setPaymentType] = useState<string>("");

  const checkStatus = () => {
    return (
      isSelectedContractor &&
      isSelectedinsured &&
      isSelectedProduct &&
      isSelectedPayment &&
      isSelectedTerms
    );
  };

  const handleClickTerms = () => {
    setShowTerms(true);
  };

  const handleClickCloseTerms = () => {
    setShowTerms(false);
  };

  const handleClickPay = () => {
    setPaymentType("");
    setShowPaymentType(true);
  };

  const handleClickClosePaymentType = () => {
    setShowPaymentType(false);
  };

  const handleClickCard = () => {
    setPaymentType("C");
    create({
      ...lead,
      link: `${config.baseURL}${router.asPath}`,
      subscription: true,
      send: false,
    });
    setShowPaymentType(false);
  };

  const handleClickLink = () => {
    setPaymentType("L");
    create({
      ...lead,
      link: `${config.baseURL}${router.asPath}`,
      subscription: false,
      send: true,
    });
    setShowPaymentType(false);
  };

  useEffect(() => {
    setIsButtonEnabled(checkStatus);
  }, [
    isSelectedContractor,
    isSelectedinsured,
    isSelectedProduct,
    isSelectedPayment,
    isSelectedTerms,
  ]);

  useEffect(() => {
    if (dataCreate && dataCreate.subscription && paymentType === "C") {
      const input = document.createElement("input");
      const form = document.createElement("form");
      const { completion_url, security_token } = dataCreate.subscription;

      form.method = "POST";
      form.action = completion_url;
      form.target = "_self";

      input.id = "TBK_TOKEN";
      input.name = "TBK_TOKEN";
      input.type = "hidden";
      input.value = security_token;

      form.appendChild(input);
      document.body.appendChild(form);
      form.submit();
    }
    getById(lead.id);
  }, [isSuccess]);

  return (
    <Screen>
      <Content>
        <Col gap="10px">
          <Row gap="10px">
            <PaymentSection
              title="Contratante"
              selected={isSelectedContractor}
              state={setIsSelectedContractor}>
              <PaymentPerson data={lead.customer} />
            </PaymentSection>
            <PaymentSection
              title="Asegurado"
              selected={isSelectedinsured}
              state={setIsSelectedinsured}>
              <PaymentInsured data={lead.insured && lead.insured[0]} />
            </PaymentSection>
          </Row>
          <PaymentSection
            title="Producto"
            selected={isSelectedProduct}
            state={setIsSelectedProduct}>
            <PaymentCoverage product={product} />
          </PaymentSection>
          {product.beneficiaries > 0 && (
            <PaymentSection
              title="Cargas"
              selected={isSelectedBeneficiaries}
              state={setIsSelectedBeneficiaries}>
              <PaymentBeneficiaries lead={lead} />
            </PaymentSection>
          )}
          <PaymentSection
            title="Valores"
            selected={isSelectedPayment}
            state={setIsSelectedPayment}>
            <PaymentProduct lead={lead} product={product} />
          </PaymentSection>
          <PaymentTerms state={setIsSelectedTerms} onClick={handleClickTerms} />
          <Row>&nbsp;</Row>
        </Col>
      </Content>
      <Footer>
        <Button
          text="Pagar"
          width="200px"
          onClick={handleClickPay}
          enabled={isButtonEnabled}
        />
      </Footer>
      {isLoading && <Loading />}
      <ModalWindow
        showModal={showTerms}
        setClosed={handleClickCloseTerms}
        title="Términos y condiciones">
        <div className={styles.termsContainer}>{termsAndCondicions.data}</div>
      </ModalWindow>
      <ModalWindow
        showModal={showPaymentType}
        setClosed={handleClickClosePaymentType}
        title="Seleccione una opción">
        <PaymentType data={paymentTypeData} />
      </ModalWindow>
    </Screen>
  );
};

export default Payment;
