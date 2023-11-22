import React, { useEffect, useRef, useState } from "react";
import { useReimbursment } from "~/store/hooks";
import { DataTableReimbursement } from "./DataTableReimbursement";
import { columns } from "./columns";
import { Input } from "~/components/ui/Input";
import { Label } from "~/components/ui/Label";
import FloatMenu from "~/components/ui/FloatMenu";
import ButtonIcon from "~/components/ui/ButtonIcon";
import { useRouter } from "next/router";
import { useFilter } from "~/store/hooks";
import InputText from "~/components/ui/InputText";

import { formatRut, unFormatRut } from "~/utils/rut";

export const Reimbursement: React.FC = () => {
  const router = useRouter();
  const [page, setPage] = useState<number>(1);
  const { getAll, list, isLoading } = useReimbursment();
  const { filters, setFilters, resetFilters } = useFilter();

  useEffect(() => {
    setFilters({
      ...filters,
      records: 10,
      page: 1,
    });
  }, []);
  useEffect(() => {
    getAll(false, "", "", 10, filters.page);
  }, [filters.page]);
  const handleRefresh: () => void = () => {
    getAll(false, filters.rut, filters.name, filters.records, filters.page);
  };
  const handleClickHome = () => {
    router.push("/");
    resetFilters();
  };
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const unformattedRut = unFormatRut(value);
    setFilters({ ...filters, rut: unformattedRut });
  };

  const handleBlur = (e: any) => {
    const value = e.target.value;

    const formattedRut = formatRut(value);
    setFilters({ ...filters, rut: formattedRut });
  };
  const previousData = useRef(list.data);
  const previousPageInfo = useRef(list?.pagination);

  const shouldShowPreviousData = isLoading && previousData.current;
  const shouldShowPreviousPageInfo = isLoading && previousPageInfo.current;
  useEffect(() => {
    if (!isLoading) {
      previousData.current = list?.data;
      previousPageInfo.current = list?.pagination;
    }
  }, [isLoading, list.data, list?.pagination]);

  const dataToShow = shouldShowPreviousData ? previousData.current : list?.data;
  const pageInfoToShow = shouldShowPreviousPageInfo
    ? previousPageInfo.current
    : list?.pagination;
  if (!dataToShow || !pageInfoToShow) return null;
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row items-center gap-4">
        <div>
          <InputText
            label="Buscar por nombre"
            width="290px"
            value={filters?.name || ""}
            onChange={(e: any) => {
              setFilters({
                ...filters,
                name: e.target.value,
                rut: "",
              });
            }}
          />
        </div>
        <div>
          {" "}
          <InputText
            label="Rut"
            width="150px"
            value={filters?.rut || ""}
            onBlur={handleBlur}
            onFocus={handleFocus}
            onChange={(e: any) => {
              setFilters({
                ...filters,
                rut: e.target.value,
                name: "",
              });
            }}
          />
        </div>
        <ButtonIcon iconName="search" onClick={handleRefresh} />
      </div>
      <DataTableReimbursement
        setPage={setPage}
        isLoading={isLoading}
        pageInfo={pageInfoToShow}
        columns={columns}
        data={dataToShow}
      />
      <FloatMenu>
        <ButtonIcon iconName="home" onClick={handleClickHome} />
        <ButtonIcon iconName="refresh" onClick={handleRefresh} />
      </FloatMenu>
    </div>
  );
};
