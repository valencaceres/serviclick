import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";

import FloatMenu from "../../components/ui/FloatMenu";
import ButtonIcon from "../../components/ui/ButtonIcon";

import { FamilyList } from "../../components/functional/_masters/Family";

import useUI from "../../hooks/useUI";
import useFamily from "../../hooks/useFamily";

const Family = () => {
  const router = useRouter();

  const { setTitleUI } = useUI();
  const { listAll, reset } = useFamily();

  const [showModal, setShowModal] = useState(false);

  const handleClickHome = () => {
    router.push("/");
  };

  const handleClickRefresh = () => {
    listAll();
  };

  const handleClickNew = () => {
    reset();
    setShowModal(true);
  };

  useEffect(() => {
    setTitleUI("Familia");
    listAll();
  }, []);

  return (
    <Fragment>
      <FamilyList setShowModal={setShowModal} showModal={showModal} />
      <FloatMenu>
        <ButtonIcon iconName="home" onClick={handleClickHome} />
        <ButtonIcon iconName="refresh" onClick={handleClickRefresh} />
        <ButtonIcon iconName="add" onClick={handleClickNew} />
      </FloatMenu>
    </Fragment>
  );
};

export default Family;
