import React from "react";

import { api } from "~/utils/api";
import { DataTableImed } from "./DataTableImed";
import { columns } from "./columns";

export const Imed: React.FC = () => {
  const { data: discounts } = api.reimbursement.getAll.useQuery({
    isImed: true,
  });

  if (!discounts) return null;

  return <DataTableImed columns={columns} data={discounts} />;
};
