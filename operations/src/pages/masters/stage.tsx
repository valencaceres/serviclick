import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";

import FloatMenu from "../../components/ui/FloatMenu";
import ButtonIcon from "../../components/ui/ButtonIcon";

import { StageList } from "../../components/functional/_masters/Stage";

import useUI from "../../hooks/useUI";
import useStage from "../../hooks/useStage";

const Stage = () => {
  const router = useRouter();

  const { setTitleUI } = useUI();
  const { getAllStages, resetStage } = useStage();

  const [showModal, setShowModal] = useState(false);

  const handleClickHome = () => {
    router.push("/");
  };

  const handleClickRefresh = () => {
    getAllStages();
  };

  const handleClickNew = () => {
    resetStage();
    setShowModal(true);
  };

  useEffect(() => {
    setTitleUI("Etapas");
    getAllStages();
  }, []);

  return (
    <Fragment>
      <StageList setShowModal={setShowModal} showModal={showModal} />
      <FloatMenu>
        <ButtonIcon iconName="home" onClick={handleClickHome} />
        <ButtonIcon iconName="refresh" onClick={handleClickRefresh} />
        {/* <ButtonIcon iconName="add" onClick={handleClickNew} /> */}
      </FloatMenu>
    </Fragment>
  );
};

export default Stage;
