import React, { useEffect, useRef, useState } from "react";

import { api } from "~/utils/api";
import { DataTableReimbursement } from "./DataTableReimbursement";
import { columns } from "./columns";

export const Reimbursement: React.FC = () => {
  const [page, setPage] = useState<number>(1);

  const { data: discounts, isLoading } = api.reimbursement.getAll.useQuery({
    isImed: false,
    numberOfReimburses: 10,
    pagination: page,
  });
  const previousData = useRef(discounts?.reimbursement);
  const previousPageInfo = useRef(discounts?.pageInfo);

  const shouldShowPreviousData = isLoading && previousData.current;
  const shouldShowPreviousPageInfo = isLoading && previousPageInfo.current;
  useEffect(() => {
    if (!isLoading) {
      previousData.current = discounts?.reimbursement;
      previousPageInfo.current = discounts?.pageInfo;
    }
  }, [isLoading, discounts?.reimbursement, discounts?.pageInfo]);

  const dataToShow = shouldShowPreviousData
    ? previousData.current
    : discounts?.reimbursement;
  const pageInfoToShow = shouldShowPreviousPageInfo
    ? previousPageInfo.current
    : discounts?.pageInfo;
  if (!dataToShow || !pageInfoToShow) return null;

  return (
    <DataTableReimbursement
      setPage={setPage}
      isLoading={isLoading}
      pageInfo={pageInfoToShow}
      columns={columns}
      data={dataToShow}
    />
  );
};
