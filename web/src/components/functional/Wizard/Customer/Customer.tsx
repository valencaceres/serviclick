import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";

import Wizard, { Title, Content, Buttons } from "../../../layout/Wizard";

import Button from "../../../ui/Button";
import Navigate, { Back } from "../../../ui/Navigate";
import Tooltip from "../../../ui/Tooltip";

import ProductBadge from "../../ProductBadge";
import CustomerForm from "./CustomerForm";

import { formatRut } from "../../../../utils/format";
import texts from "../../../../utils/texts";

import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
  setLeadCustomer,
  setLeadInsured,
} from "../../../../redux/slices/leadSlice";

const Customer = ({ register }: any) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { lead } = useAppSelector((state) => state.leadSlice);
  const { product } = useAppSelector((state) => state.productSlice);

  const initialDataCustomerForm = {
    rut: { value: lead.customer.rut, isValid: true },
    name: { value: lead.customer.name, isValid: true },
    paternalLastName: { value: lead.customer.paternalLastName, isValid: true },
    maternalLastName: { value: lead.customer.maternalLastName, isValid: true },
    address: { value: lead.customer.address, isValid: true },
    district: { value: lead.customer.district, isValid: true },
    email: { value: lead.customer.email, isValid: true },
    phone: { value: lead.customer.phone, isValid: true },
  };

  const [customerForm, setCustomerForm] = useState(initialDataCustomerForm);
  const [isEnabled, setIsEnabled] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  const { customer: customerText, frequency } = texts;

  const handleCloseTooltip = () => {
    setShowTooltip(false);
  };

  const handleClickBack = () => {
    router.back();
  };

  const handleClickRegister = () => {
    const customerData = {
      rut: formatRut(customerForm.rut.value),
      name: customerForm.name.value,
      paternalLastName: customerForm.paternalLastName.value,
      maternalLastName: customerForm.maternalLastName.value,
      address: customerForm.address.value,
      district: customerForm.district.value,
      email: customerForm.email.value,
      phone: customerForm.phone.value,
    };

    dispatch(setLeadCustomer(customerData));
    dispatch(
      setLeadInsured([
        {
          ...customerData,
          beneficiaries: lead.insured
            ? lead.insured.length > 0
              ? [...lead.insured[0].beneficiaries]
              : []
            : [],
        },
      ])
    );
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
    </Fragment>
  );
};

export default Customer;
