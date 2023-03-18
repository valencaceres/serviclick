import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";

import FloatMenu from "../../../components/ui/FloatMenu";
import ButtonIcon from "../../../components/ui/ButtonIcon";
import ModalWindow from "../../../components/ui/ModalWindow";

import { PartnerDetail } from "../../../components/functional/_entities/Partner";
import { ImportList } from "../../../components/functional/_assistances/Import";

import { useUI, useDistrict } from "../../../hooks";
import { usePartner } from "../../../store/hooks";

const ImportsPage = () => {
  const router = useRouter();

  const { setTitleUI, filters } = useUI();
  const { listAllDistrict } = useDistrict();
  const {
    partner,
    partnerIsLoading,
    getPartnersFamilies,
    getAllPartners,
    getPartnerById,
    setPartner,
    resetPartner,
    createPartner,
    deletePartner,
  } = usePartner();

  const [isSaving, setIsSaving] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [enableSave, setEnableSave] = useState(false);
  const [showModalType, setShowModalType] = useState(false);

  const handleClickHome = () => {
    router.push("/");
  };

  const handleClickRefresh = () => {
    getAllPartners();
  };

  const handleClickNew = () => {
    resetPartner();
    router.push("/assistances/import/new");
  };

  const handleViewImport = (id: string) => {
    router.push(`/assistances/import/${id}`);
  };

  const handleClickBack = () => {
    resetPartner();
    getAllPartners();
    router.push("/entities/partner");
  };

  useEffect(() => {
    setTitleUI("Importaciones");
    listAllDistrict();
    getPartnersFamilies();
    getAllPartners();
  }, []);

  useEffect(() => {
    resetPartner();
    setTitleUI(router.query?.id ? "Importación" : "Importaciones");
    if (router.query?.id) {
      if (router.query.id !== "" && router.query.id !== "new") {
        getPartnerById(router.query.id?.toString());
      }
    }
  }, [router]);

  useEffect(() => {
    if (isSaving === true && partnerIsLoading === false) {
      getAllPartners();
      setIsSaving(false);
    }
  }, [isSaving, partnerIsLoading]);

  return (
    <Fragment>
      <ImportList viewImport={handleViewImport} deletePartner={deletePartner} />
      <FloatMenu>
        <ButtonIcon iconName="home" onClick={handleClickHome} />
        <ButtonIcon iconName="refresh" onClick={handleClickRefresh} />
        <ButtonIcon iconName="add" onClick={handleClickNew} />
      </FloatMenu>
    </Fragment>
  );
};

export default ImportsPage;
