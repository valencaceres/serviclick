import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";

import FloatMenu from "../../../components/ui/FloatMenu";
import ButtonIcon from "../../../components/ui/ButtonIcon";

import {
  ContractorList,
  ContractorDetail,
} from "../../../components/functional/_entities/Contractor";

import { useUI, useContractor, useDistrict } from "../../../hooks";

const ContractorPage = () => {
  const router = useRouter();

  const { setTitleUI, filters } = useUI();
  const { listAllDistrict } = useDistrict();
  const {
    getAllContractors,
    setContractor,
    resetContractor,
    resetContractorAll,
    contractor,
    contractorLoading,
  } = useContractor();

  const [isSaving, setIsSaving] = useState(false);
  const [showModalType, setShowModalType] = useState(false);

  const handleClickHome = () => {
    router.push("/");
  };

  const handleClickRefresh = () => {
    getAllContractors(
      filters?.type || "",
      filters?.name || "",
      filters?.status || "A"
    );
  };

  const handleClickNew = () => {
    resetContractor();
    setShowModalType(true);
  };

  const handleClickEdit = (id: string) => {
    resetContractor();
    router.push(`/entities/contractor/${id}`);
  };

  useEffect(() => {
    setTitleUI("Clientes");
    listAllDistrict();
    getAllContractors(
      filters?.type || "",
      filters?.name || "",
      filters?.status || "A"
    );
  }, []);

  useEffect(() => {
    if (isSaving === true && contractorLoading === false) {
      getAllContractors(filters.type, filters.name, filters.status);
      setIsSaving(false);
    }
  }, [isSaving, contractorLoading]);

  return (
    <Fragment>
      <ContractorList
        editContractor={handleClickEdit}
        showModalType={showModalType}
        setShowModalType={setShowModalType}
      />
      <FloatMenu>
        <ButtonIcon iconName="home" onClick={handleClickHome} />
        <ButtonIcon iconName="refresh" onClick={handleClickRefresh} />
        <ButtonIcon iconName="add" onClick={handleClickNew} />
      </FloatMenu>
    </Fragment>
  );
};

export default ContractorPage;
