import React, { FC } from "react";

import ContractorPersonForm from "./ContractorPersonForm";
import ContractorCompanyForm from "./ContractorCompanyForm";

import { useContractor } from "../../../../hooks";

interface IContractorForm {
  enabled: boolean;
}

const ContractorForm = ({ enabled }: IContractorForm) => {
  const { contractor } = useContractor();
  return contractor.type === "P" ? (
    <ContractorPersonForm enabled={enabled} setEnableSave={() => {}} />
  ) : (
    <ContractorCompanyForm enabled={enabled} setEnableSave={() => {}} />
  );
};

export default ContractorForm;
