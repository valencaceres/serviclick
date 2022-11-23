import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";

import HeadPages from "../../../layout/HeadPages";
import Wizard, { Title, Content, Buttons } from "../../../layout/Wizard";

import Button from "../../../ui/Button";
import Navigate, { Back } from "../../../ui/Navigate";
import Tooltip from "../../../ui/Tooltip";
import ModalWarning from "../../../ui/ModalWarning";

import ProductBadge from "../../ProductBadge";
import CompanyForm from "./CompanyForm";

import { formatRut } from "../../../../utils/format";
import texts from "../../../../utils/texts";

import { useSubscription, useProduct, useLead } from "../../../../redux/hooks";

const Company = ({ register }: any) => {
  const router = useRouter();

  const { product } = useProduct();
  const { active } = useSubscription();
  const { lead, setLeadCompany } = useLead();

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

  const [companyForm, setCompanyForm] = useState(initialDataCompanyForm);
  const [isEnabled, setIsEnabled] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [showWarning, setShowWarning] = useState(false);

  const { company: companyText, frequency } = texts;

  const handleCloseTooltip = () => {
    setShowTooltip(false);
  };

  const handleClickBack = () => {
    router.back();
  };

  const handleClickRegister = () => {
    const companyData = {
      id: "",
      rut: formatRut(companyForm.rut.value),
      companyName: companyForm.companyName.value,
      legalRepresentative: companyForm.legalRepresentative.value,
      line: companyForm.line.value,
      address: companyForm.address.value,
      district: companyForm.district.value,
      email: companyForm.email.value,
      phone: companyForm.phone.value,
    };

    setLeadCompany(companyData);

    if (active.length !== 0) {
      setShowWarning(true);
      return;
    }
    register();
  };

  useEffect(() => {
    let enableButton = true;
    if (
      !companyForm.rut.isValid ||
      companyForm.rut.value === "" ||
      !companyForm.companyName.isValid ||
      companyForm.companyName.value === "" ||
      !companyForm.legalRepresentative.isValid ||
      companyForm.legalRepresentative.value === "" ||
      !companyForm.line.isValid ||
      companyForm.line.value === "" ||
      !companyForm.address.isValid ||
      companyForm.address.value === "" ||
      !companyForm.district.isValid ||
      companyForm.district.value === "" ||
      !companyForm.email.isValid ||
      companyForm.email.value === "" ||
      !companyForm.phone.isValid ||
      companyForm.phone.value === ""
    )
      enableButton = false;
    setIsEnabled(enableButton);
  }, [companyForm]);

  return (
    <Fragment>
      <HeadPages
        title="Empresa"
        description="Datos de la empresa contratante"
      />
      <Wizard>
        <Title>
          <Navigate>
            <Back onClick={handleClickBack} />
          </Navigate>
          {companyText.title}
          <ProductBadge />
        </Title>
        <Content>
          <CompanyForm
            companyForm={companyForm}
            setCompanyForm={setCompanyForm}
            enabled={true}
          />
        </Content>
        <Buttons>
          <Button
            onClick={handleClickRegister}
            text="Registrar"
            width="150px"
            enabled={isEnabled}
          />
        </Buttons>
      </Wizard>
      <Tooltip isShow={showTooltip} onClose={handleCloseTooltip}>
        <div>
          Estás contratando el servicio <b>{product.name}</b>, el cual tiene un
          valor de{" "}
          <b>
            $
            {product.plan.company.price
              .toLocaleString("en-US")
              .replace(",", ".")}{" "}
            {frequency[product.frequency]}
          </b>{" "}
          por cada asegurado y te brinda las siguientes coberturas:
          <br />
          <br />
          {product.assistances.map((assistance, idx) => (
            <div key={idx}>* {assistance.name}</div>
          ))}
          <br />
          <div>
            Ingresa los datos de tu empresa como contratante y al terminar
            presiona el botón <b>Registrar</b>
          </div>
        </div>
      </Tooltip>
      <ModalWarning
        showModal={showWarning}
        title="Aviso"
        message={`Existe una suscripción activa para el producto ${product.name} asociada a este rut, si requiere alguna modificación a su plan, puede ingresar a su perfil.`}
        setClosed={() => setShowWarning(false)}
        iconName="warning"
        buttons={[{ text: "Aceptar", function: () => setShowWarning(false) }]}
      />
    </Fragment>
  );
};

export default Company;
