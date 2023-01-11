import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";

import FloatMenu from "../../components/ui/FloatMenu";
import ButtonIcon from "../../components/ui/ButtonIcon";

import {
  ContractorList,
  ContractorDetail,
} from "../../components/functional/_reports/Contractor";

import { useUI, useContractor, useDistrict } from "../../hooks";

const ContractorPage = () => {
  const router = useRouter();

  const { setTitleUI, filters } = useUI();
  const { listAllDistrict } = useDistrict();
  const {
    getAllContractors,
    getContractorById,
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

  const handleClickClear = () => {
    setContractor({
      type: contractor.type,
      id: "",
      rut: "",
      fullName: "",
      name: "",
      companyName: "",
      legalRepresentative: "",
      line: "",
      paternalLastName: "",
      maternalLastName: "",
      birthDate: "",
      address: "",
      district: "",
      email: "",
      phone: "",
      quantity: 0,
      subscriptions: [],
      payment: [],
    });
  };

  const handleClickEdit = (id: string) => {
    resetContractor();
    router.push(`/reports/contractor?id=${id}`);
  };

  const handleClickBack = () => {
    resetContractorAll();
    getAllContractors(
      filters?.type || "",
      filters?.name || "",
      filters?.status || "A"
    );
    router.push("/reports/contractor");
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
    resetContractorAll();
    setTitleUI(router.query?.id ? "Cliente" : "Clientes");
    if (router.query?.id) {
      if (router.query.id !== "" && router.query.id !== "new") {
        getContractorById(router.query.id?.toString());
      }
    }
  }, [router.query]);

  useEffect(() => {
    if (isSaving === true && contractorLoading === false) {
      getAllContractors(filters.type, filters.name, filters.status);
      setIsSaving(false);
    }
  }, [isSaving, contractorLoading]);

  return router.isReady && router.query.id ? (
    <Fragment>
      <ContractorDetail />
      <FloatMenu>
        <ButtonIcon iconName="home" onClick={handleClickHome} />
        <ButtonIcon iconName="arrow_back" onClick={handleClickBack} />
        <ButtonIcon iconName="add" onClick={handleClickClear} />
      </FloatMenu>
    </Fragment>
  ) : (
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
