import React, { useEffect, useRef, useState } from "react";

import { DataTableImed } from "./DataTableImed";
import { columns } from "./columns";
import { Input } from "~/components/ui/Input";
import { Label } from "~/components/ui/Label";
import { useReimbursment } from "~/store/hooks";
export const Imed: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [searchByName, setSearchByName] = useState<string>("");
  const [searchByRut, setSearchByRut] = useState<string>("");
  const { getAll, list, isLoading } = useReimbursment();
  useEffect(() => {
    getAll(true, searchByRut, searchByName, 10, page);
  }, [page, searchByName, searchByRut, page]);

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
      <div className="flex flex-row gap-4">
        <div>
          <Label>Buscar por nombre</Label>
          <Input
            value={searchByName}
            onChange={(e) => setSearchByName(e.target.value)}
          />
        </div>
        <div>
          {" "}
          <Label>Buscar por rut</Label>
          <Input
            value={searchByRut}
            onChange={(e) => setSearchByRut(e.target.value)}
          />
        </div>
      </div>
      <DataTableImed
        setPage={setPage}
        isLoading={isLoading}
        pageInfo={pageInfoToShow}
        columns={columns}
        data={dataToShow}
      />
    </div>
  );
};
