import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";

import FloatMenu from "../../../components/ui/FloatMenu";
import ButtonIcon from "../../../components/ui/ButtonIcon";

import { ContractorList } from "../../../components/functional/_entities/Contractor";

import { useUI, useDistrict } from "../../../hooks";
import { useCustomer } from "~/store/hooks";

const initialFilters = {
  rut: null,
  name: null,
  records: 20,
  page: 1,
};

const ContractorPage = () => {
  const router = useRouter();

  const { setTitleUI } = useUI();
  const { listAllDistrict } = useDistrict();
  const { getByRutOrName, customerList } = useCustomer();

  const [isSaving, setIsSaving] = useState(false);
  const [filters, setFilters] = useState(initialFilters);

  const handleClickHome = () => {
    router.push("/");
  };

  const handleClickRefresh = () => {
    getByRutOrName(
      filters?.rut || null,
      filters?.name || null,
      filters?.records || 20,
      filters?.page || 1
    );
  };

  const handleClickEdit = (id: string) => {
    router.push(`/reports/contractor/${id}`);
  };

  useEffect(() => {
    setTitleUI("Clientes");
    listAllDistrict();
    setFilters(initialFilters);
    getByRutOrName(
      initialFilters.rut,
      initialFilters.name,
      initialFilters.records,
      initialFilters.page
    );
  }, []);

  return (
    <Fragment>
      <ContractorList
        editContractor={handleClickEdit}
        filters={filters}
        setFilters={setFilters}
      />
      <FloatMenu>
        <ButtonIcon iconName="home" onClick={handleClickHome} />
        <ButtonIcon iconName="refresh" onClick={handleClickRefresh} />
      </FloatMenu>
    </Fragment>
  );
};

export default ContractorPage;
