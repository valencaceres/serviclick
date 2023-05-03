import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";

import Customer from "../../../components/functional/_contract/Customer";

import FloatMenu from "../../../components/ui/FloatMenu";
import ButtonIcon from "../../../components/ui/ButtonIcon";

import { useUI, useDistrict, useLead, useProduct } from "../../../hooks";

const SaleContractCustomerPage = () => {
  const router = useRouter();

  const { setTitleUI } = useUI();
  const { listAllDistrict } = useDistrict();
  const { setLeadCustomer, setLeadInsured, resetLead, lead } = useLead();
  const { product } = useProduct();

  const initialDataCustomer = {
    rut: {
      value: lead.customer.rut !== "" ? lead.customer.rut : "",
      isValid: lead.customer.rut !== "",
    },
    birthDate: {
      value: lead.customer.birthDate !== "" ? lead.customer.birthDate : "",
      isValid: lead.customer.birthDate !== "",
    },
    name: {
      value: lead.customer.name !== "" ? lead.customer.name : "",
      isValid: lead.customer.name !== "",
    },
    paternalLastName: {
      value:
        lead.customer.paternalLastName !== ""
          ? lead.customer.paternalLastName
          : "",
      isValid: lead.customer.paternalLastName !== "",
    },
    maternalLastName: {
      value:
        lead.customer.maternalLastName !== ""
          ? lead.customer.maternalLastName
          : "",
      isValid: lead.customer.maternalLastName !== "",
    },
    address: {
      value: lead.customer.address !== "" ? lead.customer.address : "",
      isValid: lead.customer.address !== "",
    },
    district: {
      value: lead.customer.district !== "" ? lead.customer.district : "",
      isValid: lead.customer.district !== "",
    },
    email: {
      value: lead.customer.email !== "" ? lead.customer.email : "",
      isValid: lead.customer.email !== "",
    },
    phone: {
      value: lead.customer.phone !== "" ? lead.customer.phone : "",
      isValid: lead.customer.phone !== "",
    },
  };

  const [customerForm, setCustomerForm] = useState(initialDataCustomer);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const handleClickHome = () => {
    router.push("/");
  };

  const handleClickNew = () => {
    resetLead();
    setCustomerForm(initialDataCustomer);
  };

  const handleClickRegister = () => {
    setLeadCustomer({
      id: "",
      rut: customerForm.rut.value,
      birthDate: customerForm.birthDate.value,
      name: customerForm.name.value,
      paternalLastName: customerForm.paternalLastName.value,
      maternalLastName: customerForm.maternalLastName.value,
      address: customerForm.address.value,
      district: customerForm.district.value,
      email: customerForm.email.value,
      phone: customerForm.phone.value,
    });

    setLeadInsured([
      {
        id: "",
        rut: customerForm.rut.value,
        birthDate: customerForm.birthDate.value,
        name: customerForm.name.value,
        paternalLastName: customerForm.paternalLastName.value,
        maternalLastName: customerForm.maternalLastName.value,
        address: customerForm.address.value,
        district: customerForm.district.value,
        email: customerForm.email.value,
        phone: customerForm.phone.value,
        beneficiaries: [],
      },
    ]);

    if (product.beneficiaries > 0) {
      router.push("/sale/beneficiaries/customer");
    } else {
      router.push("/sale/payment");
    }
    return;
  };

  const handleClickBack = () => {
    router.push("/menu/product");
  };

  useEffect(() => {
    setTitleUI("Contratante");
    setCustomerForm(initialDataCustomer);
    listAllDistrict();
  }, []);

  return (
    <Fragment>
      <Customer
        customerForm={customerForm}
        setCustomerForm={setCustomerForm}
        setIsButtonEnabled={setIsButtonEnabled}
      />
      <FloatMenu>
        <ButtonIcon iconName="home" onClick={handleClickHome} />
        <ButtonIcon iconName="add" onClick={handleClickNew} />
        <ButtonIcon
          iconName="save"
          onClick={handleClickRegister}
          disabled={!isButtonEnabled}
        />
      </FloatMenu>
    </Fragment>
  );
};

export default SaleContractCustomerPage;
