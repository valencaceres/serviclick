import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";

import Company from "../../../components/functional/_contract/Company";

import FloatMenu from "../../../components/ui/FloatMenu";
import ButtonIcon from "../../../components/ui/ButtonIcon";

import { useUI, useDistrict, useLead, useProduct } from "../../../hooks";

const SaleContractCompanyPage = () => {
  const router = useRouter();

  const { setTitleUI } = useUI();
  const { listAllDistrict } = useDistrict();
  const { setLeadCompany } = useLead();

  const initialDataCompany = {
    rut: { value: "", isValid: false },
    companyName: { value: "", isValid: false },
    legalRepresentative: { value: "", isValid: false },
    line: { value: "", isValid: false },
    address: { value: "", isValid: false },
    district: { value: "", isValid: false },
    email: { value: "", isValid: false },
    phone: { value: "", isValid: false },
  };

  const [companyForm, setCompanyForm] = useState(initialDataCompany);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const handleClickHome = () => {
    router.push("/");
  };

  const handleClickNew = () => {
    setCompanyForm(initialDataCompany);
  };

  const handleClickRegister = () => {
    setLeadCompany({
      id: "",
      rut: companyForm.rut.value,
      companyName: companyForm.companyName.value,
      legalRepresentative: companyForm.legalRepresentative.value,
      line: companyForm.line.value,
      address: companyForm.address.value,
      district: companyForm.district.value,
      email: companyForm.email.value,
      phone: companyForm.phone.value,
    });

    router.push("/sale/insured/company");
    return;
  };

  const handleClickBack = () => {
    router.push("/menu/product");
  };

  useEffect(() => {
    setTitleUI("Contratante");
    setCompanyForm(initialDataCompany);
    listAllDistrict();
  }, []);

  return (
    <Fragment>
      <Company
        companyForm={companyForm}
        setCompanyForm={setCompanyForm}
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

export default SaleContractCompanyPage;
