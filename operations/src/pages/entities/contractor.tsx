import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";

import FloatMenu from "../../components/ui/FloatMenu";
import ButtonIcon from "../../components/ui/ButtonIcon";

import {
  ContractorList,
  ContractorDetail,
} from "../../components/functional/_entities/Contractor";

import { useUI, useContractor } from "../../hooks";

const ContractorPage = () => {
  const router = useRouter();

  const { setTitleUI, filters } = useUI();
  const {
    createContractor,
    getAllContractors,
    getContractorById,
    setContractor,
    resetContractor,
    resetContractorAll,
    contractor,
    contractorLoading,
  } = useContractor();

  const [isSaving, setIsSaving] = useState(false);
  const [enableSave, setEnableSave] = useState(false);
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
    });
  };

  const handleClickEdit = (id: string) => {
    resetContractor();
    router.push(`/entities/contractor?id=${id}`);
  };

  const handleClickBack = () => {
    resetContractorAll();
    getAllContractors(
      filters?.type || "",
      filters?.name || "",
      filters?.status || "A"
    );
    router.push("/entities/contractor");
  };

  const handleClickSave = () => {
    // const contractorData =
    //   contractor.type === "P"
    //     ? {
    //         ...contractor,
    //         rut: personForm.rut.value,
    //         name: personForm.name.value,
    //         paternalLastName: personForm.paternalLastName.value,
    //         maternalLastName: personForm.maternalLastName.value,
    //         birthDate: personForm.birthDate.value,
    //         address: personForm.address.value,
    //         district: personForm.district.value,
    //         email: personForm.email.value,
    //         phone: personForm.phone.value,
    //       }
    //     : {
    //         ...contractor,
    //         rut: companyForm.rut.value,
    //         companyName: companyForm.companyName.value,
    //         legalRepresentative: companyForm.legalRepresentative.value,
    //         line: companyForm.line.value,
    //         address: companyForm.address.value,
    //         district: companyForm.district.value,
    //         email: companyForm.email.value,
    //         phone: companyForm.phone.value,
    //       };
    // setContractor(contractorData);
    createContractor(contractor);
  };

  useEffect(() => {
    setTitleUI("Clientes");
    getAllContractors(
      filters?.type || "",
      filters?.name || "",
      filters?.status || "A"
    );
  }, []);

  useEffect(() => {
    resetContractorAll();
    if (router.query.id !== "" && router.query.id !== "new") {
      router.query.id && getContractorById(router.query.id?.toString());
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
      <ContractorDetail setEnableSave={setEnableSave} />
      <FloatMenu>
        <ButtonIcon iconName="home" onClick={handleClickHome} />
        <ButtonIcon iconName="arrow_back" onClick={handleClickBack} />
        <ButtonIcon iconName="add" onClick={handleClickClear} />
        <ButtonIcon
          iconName="save"
          onClick={() => {
            handleClickSave();
          }}
          disabled={!enableSave}
          loading={contractorLoading}
        />
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
