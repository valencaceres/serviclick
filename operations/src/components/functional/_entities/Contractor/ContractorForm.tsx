import { useRouter } from "next/router";
import React from "react";

import ContractorPersonForm from "./ContractorPersonForm";
import ContractorCompanyForm from "./ContractorCompanyForm";

const ContractorForm = ({ contractor }: any) => {
  const { query } = useRouter();

  return contractor?.type === "P" && query.id ? (
    <ContractorPersonForm />
  ) : (
    <ContractorCompanyForm contractor={contractor} />
  );
};

export default ContractorForm;
