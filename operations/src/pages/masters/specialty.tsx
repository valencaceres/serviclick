import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";

import FloatMenu from "../../components/ui/FloatMenu";
import ButtonIcon from "../../components/ui/ButtonIcon";

import { SpecialtyList } from "../../components/functional/_masters/Specialty";

import { useUI, useFamily, useSpecialty } from "../../hooks";

const Specialty = () => {
  const router = useRouter();

  const { setTitleUI } = useUI();
  const { listAll } = useFamily();
  const { getFamilies, getAllSpecialties, resetSpecialty } = useSpecialty();

  const [showModal, setShowModal] = useState(false);

  const handleClickHome = () => {
    router.push("/");
  };

  const handleClickRefresh = () => {
    listAll();
    getFamilies();
    getAllSpecialties();
  };

  const handleClickNew = () => {
    resetSpecialty();
    setShowModal(true);
  };

  useEffect(() => {
    setTitleUI("Especialidades");
    listAll();
    getFamilies();
    getAllSpecialties();
  }, []);

  return (
    <Fragment>
      <SpecialtyList setShowModal={setShowModal} showModal={showModal} />
      <FloatMenu>
        <ButtonIcon iconName="home" onClick={handleClickHome} />
        <ButtonIcon iconName="refresh" onClick={handleClickRefresh} />
        <ButtonIcon iconName="add" onClick={handleClickNew} />
      </FloatMenu>
    </Fragment>
  );
};

export default Specialty;
