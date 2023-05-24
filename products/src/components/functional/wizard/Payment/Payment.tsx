import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useMediaQuery } from "react-responsive";

import PaymentSection from "./PaymentSection";
import PaymentPerson from "./PaymentPerson";
import PaymentInsured from "./PaymentInsured";
import PaymentCoverage from "./PaymentCoverage";
import PaymentProduct from "./PaymentProduct";
import PaymentBeneficiaries from "./PaymentBeneficiaries";
import PaymentTerms from "./PaymentTerms";
import PaymentType from "./PaymentType";

import { Body, Content, Footer, Col, Row } from "@/components/layout/Generic";

import Button from "@/components/ui/Button/Button";
import Loading from "@/components/ui/Loading";
import Tooltip from "@/components/ui/Tooltip";
import ModalWindow from "@/components/ui/ModalWindow/index";

import { useProduct, useLead, useUI } from "@/store/hooks";

import styles from "./Payment.module.scss";

import { termsAndCondicions } from "@/data/termsAndConditions";
import { config } from "@/utils/config";

const Payment = () => {
  const router = useRouter();

  const isDesktop = useMediaQuery({ minWidth: 1200 });

  const paymentTypeData = [
    {
      iconName: "credit_card",
      text: "Pagar con tarjeta",
      description:
        "Accede a nuestra plataforma de pago seguro donde podrás utilizar la tarjeta bancaria de tu preferencia (crédito, débito o prepago)",
      onClick: () => handleClickPaymentType("C"),
    },
    {
      iconName: "attach_email",
      text: "Link de pago",
      description:
        "Si lo prefieres, te enviamos un link a tu correo electrónico para que realices el pago de forma posterior (no tendrás que digitar nuevamente)",
      onClick: () => handleClickPaymentType("L"),
    },
  ];
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const { ui } = useUI();
  const { lead, getLeadById, createLead, leadIsLoading, leadIsError } =
    useLead();
  const { product } = useProduct();

  const [isSelectedContractor, setIsSelectedContractor] = useState(false);
  const [isSelectedinsured, setIsSelectedinsured] = useState(false);
  const [isSelectedProduct, setIsSelectedProduct] = useState(false);
  const [isSelectedBeneficiaries, setIsSelectedBeneficiaries] = useState(false);
  const [isSelectedPayment, setIsSelectedPayment] = useState(false);
  const [isSelectedTerms, setIsSelectedTerms] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

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

  const handleClickPaymentType = (type: string) => {
    setIsProcessing(true);
    setPaymentType(type);
    createLead({
      ...lead,
      user_id: ui.userId,
      link: `${config.baseURL}${router.asPath}`,
      subscription: type === "C",
      send: type === "L",
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
    if (
      lead &&
      lead.subscriptionData &&
      paymentType === "C" &&
      leadIsLoading === false &&
      isProcessing === true
    ) {
      const input = document.createElement("input");
      const form = document.createElement("form");
      const { completion_url, security_token } = lead.subscriptionData;

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

      setIsProcessing(false);
    }

    if (
      lead &&
      paymentType === "L" &&
      leadIsLoading === false &&
      isProcessing === true
    ) {
      setIsProcessing(false);
      router.push(`/resume/link?leadId=${lead.id}&success=${!leadIsError}`);
    }
  }, [lead.subscriptionData, leadIsLoading, isProcessing]);

  return (
    <Body>
      <Content>
        <Col gap="10px">
          {isDesktop ? (
            <>
              <Row gap="10px">
                <PaymentSection
                  title="Contratante"
                  selected={isSelectedContractor}
                  state={setIsSelectedContractor}
                >
                  <PaymentPerson data={lead.customer} />
                </PaymentSection>
                <PaymentSection
                  title="Beneficiario"
                  selected={isSelectedinsured}
                  state={setIsSelectedinsured}
                >
                  <PaymentInsured data={lead.insured && lead.insured[0]} />
                </PaymentSection>
              </Row>
              <PaymentSection
                title="Producto"
                selected={isSelectedProduct}
                state={setIsSelectedProduct}
              >
                <PaymentCoverage product={product} />
              </PaymentSection>
              {product.beneficiaries > 0 && (
                <PaymentSection
                  title="Cargas"
                  selected={isSelectedBeneficiaries}
                  state={setIsSelectedBeneficiaries}
                >
                  <PaymentBeneficiaries lead={lead} />
                </PaymentSection>
              )}
              <PaymentSection
                title="Valores"
                selected={isSelectedPayment}
                state={setIsSelectedPayment}
              >
                <PaymentProduct lead={lead} product={product} />
              </PaymentSection>
              <PaymentTerms
                state={setIsSelectedTerms}
                onClick={handleClickTerms}
              />
            </>
          ) : (
            <Col gap="10px">
              <PaymentSection
                title="Contratante"
                selected={isSelectedContractor}
                state={setIsSelectedContractor}
              >
                <PaymentPerson data={lead.customer} />
              </PaymentSection>
              <PaymentSection
                title="Beneficiario"
                selected={isSelectedinsured}
                state={setIsSelectedinsured}
              >
                <PaymentInsured data={lead.insured && lead.insured[0]} />
              </PaymentSection>
              <PaymentSection
                title="Producto"
                selected={isSelectedProduct}
                state={setIsSelectedProduct}
              >
                <PaymentCoverage product={product} />
              </PaymentSection>
              {product.beneficiaries > 0 && (
                <PaymentSection
                  title="Cargas"
                  selected={isSelectedBeneficiaries}
                  state={setIsSelectedBeneficiaries}
                >
                  <PaymentBeneficiaries lead={lead} />
                </PaymentSection>
              )}
              <PaymentSection
                title="Valores"
                selected={isSelectedPayment}
                state={setIsSelectedPayment}
              >
                <PaymentProduct lead={lead} product={product} />
              </PaymentSection>
              <PaymentTerms
                state={setIsSelectedTerms}
                onClick={handleClickTerms}
              />
            </Col>
          )}
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
      {leadIsLoading && <Loading />}
      <Tooltip>
        <h1>Revisa la información</h1>
        <h2>(Paso 4 de 4)</h2>
        <br />
        Verifica que los datos ingresados sean los correctos, para ello te
        desplegamos la información del servicio que estás contratanto, te
        pedimos que hagas click en el ckeck al lado de cada título y finalmente
        en nuestros&nbsp;<b>&quot;Términos y Condiciones&quot;</b>.
        <br />
        <br />
        Si estás conforme, al terminar de checkear, presiona el botón&nbsp;
        <b>&quot;Pagar&quot;</b>&nbsp;y podrás seleccionar entre pagar
        directamente mediante nuestra plataforma de pago seguro o enviar un link
        de pago a tu correo electrónco.
      </Tooltip>
      <ModalWindow
        showModal={showTerms}
        setClosed={handleClickCloseTerms}
        title="Términos y condiciones"
      >
        <div className={styles.termsContainer}>{termsAndCondicions.data}</div>
      </ModalWindow>
      <ModalWindow
        showModal={showPaymentType}
        setClosed={handleClickClosePaymentType}
        title="Seleccione una opción"
      >
        <PaymentType data={paymentTypeData} />
      </ModalWindow>
    </Body>
  );
};

export default Payment;
