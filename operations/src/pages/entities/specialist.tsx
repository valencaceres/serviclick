import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";

import FloatMenu from "../../components/ui/FloatMenu";
import ButtonIcon from "../../components/ui/ButtonIcon";
import ModalWindow from "../../components/ui/ModalWindow";

import {
  SpecialistList,
  SpecialistDetail,
} from "../../components/functional/_entities/Specialist";

import { useUI, useDistrict } from "../../hooks";
import { useSpecialist } from "../../store/hooks";

const SpecialistPage = () => {
  const router = useRouter();

  const { setTitleUI, filters } = useUI();
  const { listAllDistrict } = useDistrict();
  const {
    specialist,
    specialistIsLoading,
    getSpecialistsFamilies,
    getAllSpecialists,
    getSpecialistById,
    setSpecialist,
    resetSpecialist,
    createSpecialist,
    deleteSpecialist,
  } = useSpecialist();

  const [isSaving, setIsSaving] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [enableSave, setEnableSave] = useState(false);
  const [showModalType, setShowModalType] = useState(false);

  const handleClickHome = () => {
    router.push("/");
  };

  const handleClickRefresh = () => {
    getAllSpecialists();
  };

  const handleClickNew = () => {
    resetSpecialist();
    router.push("/entities/specialist?id=new");
  };

  const handleClickSave = () => {
    setIsSaving(true);
    createSpecialist(specialist);
    setIsSaving(false);
  };

  const handleClickClear = () => {
    setSpecialist({
      id: "",
      rut: "",
      name: "",
      paternalLastName: "",
      maternalLastName: "",
      birthDate: "",
      address: "",
      district: "",
      email: "",
      phone: "",
      specialties: [],
      districts: [],
      isRemote: false,
    });
  };

  const editSpecialist = (id: string) => {
    resetSpecialist();
    router.push(`/entities/specialist?id=${id}`);
  };

  const handleClickBack = () => {
    resetSpecialist();
    //getAllSpecialists();
    router.push("/entities/specialist");
  };

  useEffect(() => {
    setTitleUI("Especialistas");
    listAllDistrict();
    getSpecialistsFamilies();
    getAllSpecialists();
  }, []);

  useEffect(() => {
    resetSpecialist();
    setTitleUI(router.query?.id ? "Especialista" : "Especialistas");
    if (router.query?.id) {
      if (router.query.id !== "" && router.query.id !== "new") {
        getSpecialistById(router.query.id?.toString());
      }
    }
  }, [router]);

  useEffect(() => {
    if (isSaving === true && specialistIsLoading === false) {
      getAllSpecialists();
      setIsSaving(false);
    }
  }, [isSaving, specialistIsLoading]);

  return router.isReady && router.query.id ? (
    <Fragment>
      <SpecialistDetail setEnableSave={setEnableSave} />
      <FloatMenu>
        <ButtonIcon iconName="home" onClick={handleClickHome} />
        <ButtonIcon iconName="arrow_back" onClick={handleClickBack} />
        <ButtonIcon iconName="save" onClick={handleClickSave} />
      </FloatMenu>
    </Fragment>
  ) : (
    <Fragment>
      <SpecialistList
        editSpecialist={editSpecialist}
        deleteSpecialist={deleteSpecialist}
      />
      <FloatMenu>
        <ButtonIcon iconName="home" onClick={handleClickHome} />
        <ButtonIcon iconName="refresh" onClick={handleClickRefresh} />
        <ButtonIcon iconName="add" onClick={handleClickNew} />
      </FloatMenu>
    </Fragment>
  );
};

export default SpecialistPage;
