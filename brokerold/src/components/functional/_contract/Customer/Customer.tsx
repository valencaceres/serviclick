import { useEffect } from "react";

import { Content } from "../../../layout/Content";

import CustomerForm from "./CustomerForm";

const Customer = ({
  customerForm,
  setCustomerForm,
  setIsButtonEnabled,
}: any) => {
  useEffect(() => {
    setIsButtonEnabled(
      customerForm.rut.isValid &&
        customerForm.email.isValid &&
        customerForm.phone.isValid &&
        customerForm.rut.value !== "" &&
        customerForm.birthDate.value !== "" &&
        customerForm.name.value !== "" &&
        customerForm.paternalLastName.value !== "" &&
        customerForm.maternalLastName.value !== "" &&
        customerForm.address.value !== "" &&
        customerForm.district.value !== "" &&
        customerForm.email.value !== "" &&
        customerForm.phone.value !== ""
    );
  }, [customerForm]);

  return (
    <Content>
      <CustomerForm
        customerForm={customerForm}
        setCustomerForm={setCustomerForm}
        disabled={false}
      />
    </Content>
  );
};

export default Customer;
