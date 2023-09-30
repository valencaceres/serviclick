import { useRouter } from "next/router";
import React from "react";

import RetailCompanyForm from "./RetailCompanyForm";

const RetailForm = ({ retail, isEditing, setIsEditing }: any) => {
  <RetailCompanyForm
    retail={retail}
    isEditing={isEditing}
    setIsEditing={setIsEditing}
  />;
};

export default RetailForm;
