import { useRouter } from "next/router";
import React from "react";

import ContractorPersonForm from "./ContractorPersonForm";
import ContractorCompanyForm from "./ContractorCompanyForm";

const ContractorForm = ({ contractor, isEditing, setIsEditing }: any) => {
  const { query } = useRouter();

  return contractor?.type === "P" && query.id ? (
    <ContractorPersonForm
      contractor={contractor}
      isEditing={isEditing}
      setIsEditing={setIsEditing}
    />
  ) : (
    <ContractorCompanyForm
      contractor={contractor}
      isEditing={isEditing}
      setIsEditing={setIsEditing}
    />
  );
};

export default ContractorForm;
