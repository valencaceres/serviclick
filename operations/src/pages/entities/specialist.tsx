import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";

import FloatMenu from "../../components/ui/FloatMenu";
import ButtonIcon from "../../components/ui/ButtonIcon";

import {
  SpecialistList,
  SpecialistDetail,
} from "../../components/functional/_entities/Specialist";

import { useUI, useSpecialist, useDistrict } from "../../hooks";

const SpecialistPage = () => {
  const router = useRouter();

  const { setTitleUI, filters } = useUI();
  const { listAllDistrict } = useDistrict();
  const {
    getFamilies,
    getAllSpecialists,
    getSpecialistById,
    setSpecialist,
    resetSpecialist,
    specialist,
    specialistLoading,
  } = useSpecialist();

  const [isSaving, setIsSaving] = useState(false);
  const [showModalType, setShowModalType] = useState(false);

  const handleClickHome = () => {
    router.push("/");
  };

  const handleClickRefresh = () => {
    getAllSpecialists();
  };

  const handleClickNew = () => {
    resetSpecialist();
    setShowModalType(true);
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
    });
  };

  const editSpecialist = (id: string) => {
    resetSpecialist();
    router.push(`/entities/specialist?id=${id}`);
  };

  const handleClickBack = () => {
    resetSpecialist();
    getAllSpecialists();
    router.push("/entities/specialist");
  };

  useEffect(() => {
    setTitleUI("Especialistas");
    getFamilies();
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
  }, [router.query]);

  useEffect(() => {
    if (isSaving === true && specialistLoading === false) {
      getAllSpecialists();
      setIsSaving(false);
    }
  }, [isSaving, specialistLoading]);

  return router.isReady && router.query.id ? (
    <Fragment>
      <SpecialistDetail />
      <FloatMenu>
        <ButtonIcon iconName="home" onClick={handleClickHome} />
        <ButtonIcon iconName="arrow_back" onClick={handleClickBack} />
        <ButtonIcon iconName="add" onClick={handleClickClear} />
      </FloatMenu>
    </Fragment>
  ) : (
    <Fragment>
      <SpecialistList editSpecialist={editSpecialist} />
      <FloatMenu>
        <ButtonIcon iconName="home" onClick={handleClickHome} />
        <ButtonIcon iconName="refresh" onClick={handleClickRefresh} />
        <ButtonIcon iconName="add" onClick={handleClickNew} />
      </FloatMenu>
    </Fragment>
  );
};

export default SpecialistPage;
