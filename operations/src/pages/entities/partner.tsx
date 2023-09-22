import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";

import FloatMenu from "../../components/ui/FloatMenu";
import ButtonIcon from "../../components/ui/ButtonIcon";
import ModalWindow from "../../components/ui/ModalWindow";

import {
  PartnerList,
  PartnerDetail,
} from "../../components/functional/_entities/Partner";

import { useUI, useDistrict } from "../../hooks";
import { usePartner } from "../../store/hooks";

const PartnerPage = () => {
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
    router.push("/entities/partner?id=new");
  };

  const handleClickSave = () => {
    setIsSaving(true);
    createPartner(partner);
    setIsSaving(false);
  };

  const handleClickClear = () => {
    setPartner({
      id: "",
      rut: "",
      name: "",
      legalrepresentative: "",
      line: "",
      address: "",
      district: "",
      email: "",
      phone: "",
      specialties: [],
    });
  };

  const editPartner = (id: string) => {
    resetPartner();
    router.push(`/entities/partner?id=${id}`);
  };

  const handleClickBack = () => {
    resetPartner();
    getAllPartners();
    router.push("/entities/partner");
  };

  useEffect(() => {
    setTitleUI("Alianzas");
    listAllDistrict();
    getPartnersFamilies();
    getAllPartners();
  }, []);

  useEffect(() => {
    resetPartner();
    setTitleUI(router.query?.id ? "Alianza" : "Alianzas");
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

  return router.isReady && router.query.id ? (
    <Fragment>
      <PartnerDetail setEnableSave={setEnableSave} />
      <FloatMenu>
        <ButtonIcon iconName="home" onClick={handleClickHome} />
        <ButtonIcon iconName="arrow_back" onClick={handleClickBack} />
        <ButtonIcon iconName="save" onClick={handleClickSave} />
      </FloatMenu>
    </Fragment>
  ) : (
    <Fragment>
      <PartnerList editPartner={editPartner} deletePartner={deletePartner} />
      <FloatMenu>
        <ButtonIcon iconName="home" onClick={handleClickHome} />
        <ButtonIcon iconName="refresh" onClick={handleClickRefresh} />
        <ButtonIcon iconName="add" onClick={handleClickNew} />
      </FloatMenu>
    </Fragment>
  );
};

export default PartnerPage;
