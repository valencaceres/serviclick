import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";

import Wizard, { Title, Content, Buttons } from "../../../layout/Wizard";

import Button from "../../../ui/Button";
import Navigate, { Back } from "../../../ui/Navigate";
import Tooltip from "../../../ui/Tooltip";
import ModalWarning from "../../../ui/ModalWarning";

import ProductBadge from "../../ProductBadge";
import CustomerForm from "./CustomerForm";

import { formatRut } from "../../../../utils/format";
import texts from "../../../../utils/texts";

import { useProduct, useSubscription, useLead } from "../../../../redux/hooks";

const Customer = ({ register }: any) => {
  const router = useRouter();

  const { active } = useSubscription();
  const { product } = useProduct();
  const { lead, setLeadCustomer, setLeadInsured } = useLead();

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

  const [customerForm, setCustomerForm] = useState(initialDataCustomerForm);
  const [isEnabled, setIsEnabled] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [showWarning, setShowWarning] = useState(false);

  const { customer: customerText, frequency } = texts;

  const handleCloseTooltip = () => {
    setShowTooltip(false);
  };

  const handleClickBack = () => {
    router.back();
  };

  const handleClickRegister = () => {
    const customerData = {
      id: "",
      rut: formatRut(customerForm.rut.value),
      name: customerForm.name.value,
      paternalLastName: customerForm.paternalLastName.value,
      maternalLastName: customerForm.maternalLastName.value,
      birthDate: customerForm.birthDate.value,
      address: customerForm.address.value,
      district: customerForm.district.value,
      email: customerForm.email.value,
      phone: customerForm.phone.value,
    };

    setLeadCustomer(customerData);
    setLeadInsured([
      {
        ...customerData,
        beneficiaries: lead.insured
          ? lead.insured.length > 0
            ? [...lead.insured[0].beneficiaries]
            : []
          : [],
      },
    ]);

    if (active.length !== 0) {
      setShowWarning(true);
      return;
    }
    register();
  };

  useEffect(() => {
    let enableButton = true;
    if (
      !customerForm.rut.isValid ||
      customerForm.rut.value === "" ||
      !customerForm.name.isValid ||
      customerForm.name.value === "" ||
      !customerForm.paternalLastName.isValid ||
      customerForm.paternalLastName.value === "" ||
      !customerForm.maternalLastName.isValid ||
      customerForm.maternalLastName.value === "" ||
      !customerForm.birthDate.isValid ||
      customerForm.birthDate.value === "" ||
      !customerForm.address.isValid ||
      customerForm.address.value === "" ||
      !customerForm.district.isValid ||
      customerForm.district.value === "" ||
      !customerForm.email.isValid ||
      customerForm.email.value === "" ||
      !customerForm.phone.isValid ||
      customerForm.phone.value === ""
    )
      enableButton = false;
    setIsEnabled(enableButton);
  }, [customerForm]);

  return (
    <Fragment>
      <Wizard>
        <Title>
          <Navigate>
            <Back onClick={handleClickBack} />
          </Navigate>
          {customerText.title}
          <ProductBadge />
        </Title>
        <Content>
          <CustomerForm
            customerForm={customerForm}
            setCustomerForm={setCustomerForm}
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
            ${product.price.customer.toLocaleString("en-US").replace(",", ".")}{" "}
            {frequency[product.frequency]}
          </b>{" "}
          y te brinda las siguientes coberturas:
          <br />
          <br />
          {product.coverages.map((coverage, idx) => (
            <div key={idx}>* {coverage.name}</div>
          ))}
          <br />
          <div>
            Ingresa tus datos personales como contratante y al terminar presiona
            el botón <b>Registrar</b>
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

export default Customer;
