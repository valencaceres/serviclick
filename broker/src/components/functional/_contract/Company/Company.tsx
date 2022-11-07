import { useEffect } from "react";

import { Content } from "../../../layout/Content";

import CompanyForm from "./CompanyForm";

const Company = ({ companyForm, setCompanyForm, setIsButtonEnabled }: any) => {
  useEffect(() => {
    setIsButtonEnabled(
      companyForm.rut.isValid &&
        companyForm.email.isValid &&
        companyForm.phone.isValid &&
        companyForm.rut.value !== "" &&
        companyForm.companyName.value !== "" &&
        companyForm.legalRepresentative.value !== "" &&
        companyForm.line.value !== "" &&
        companyForm.address.value !== "" &&
        companyForm.district.value !== "" &&
        companyForm.email.value !== "" &&
        companyForm.phone.value !== ""
    );
  }, [companyForm]);

  return (
    <Content>
      <CompanyForm
        companyForm={companyForm}
        setCompanyForm={setCompanyForm}
        disabled={false}
      />
    </Content>
  );
};

export default Company;
