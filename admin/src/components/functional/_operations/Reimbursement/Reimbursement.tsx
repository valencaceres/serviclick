import React from "react";

import { api } from "~/utils/api";
import { DataTableReimbursement } from "./DataTableReimbursement";
import { columns } from "./columns";

export const Reimbursement: React.FC = () => {
  const { data: reimbursements } = api.reimbursement.getAll.useQuery({
    isImed: false,
  });

  if (!reimbursements) return null;

  return <DataTableReimbursement columns={columns} data={reimbursements} />;
};
