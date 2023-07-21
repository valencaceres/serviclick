import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";

import {
  AssistanceDetail,
  AssistanceList,
} from "../../components/functional/_masters/Assistance";

import FloatMenu from "../../components/ui/FloatMenu";
import ButtonIcon from "../../components/ui/ButtonIcon";

import { useUI, useAssistance, useFamily } from "../../hooks";

const Assistance = () => {
  const router = useRouter();

  const { setTitleUI } = useUI();
  const {
    createAssistance,
    updateAssistanceById,
    resetAssistanceAll,
    getAllAssistances,
    getAssistanceById,
    getAssistanceFamilies,
    assistance,
    assistanceLoading,
  } = useAssistance();
  const { listAll } = useFamily();

  const [enableSave, setEnableSave] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleClickHome = () => {
    router.push("/");
  };

  const handleClickRefresh = () => {
    getAllAssistances();
  };

  const handleClickBack = () => {
    resetAssistanceAll();
    router.push("/masters/assistance");
  };

  const handleClickNew = () => {
    resetAssistanceAll();
    router.push("/masters/assistance?id=new");
  };

  const editAssistance = (id: string) => {
    router.push(`/masters/assistance?id=${id}`);
  };

  const handleClickSave = () => {
    setIsSaving(true);
    createAssistance(assistance);
  };

  useEffect(() => {
    setTitleUI("Servicios");
    listAll();
    getAllAssistances();
    getAssistanceFamilies();
  }, []);

  useEffect(() => {
    resetAssistanceAll();
    if (router.query.id !== "" && router.query.id !== "new") {
      router.query.id && getAssistanceById(router.query.id?.toString());
    }
  }, [router.query]);

  useEffect(() => {
    if (isSaving === true && assistanceLoading === false) {
      getAllAssistances();
      setIsSaving(false);
    }
  }, [isSaving, assistanceLoading]);

  return router.isReady && router.query.id ? (
    <Fragment>
      <AssistanceDetail setEnableSave={setEnableSave} />
      <FloatMenu>
        <ButtonIcon iconName="home" onClick={handleClickHome} />
        <ButtonIcon iconName="arrow_back" onClick={handleClickBack} />
        <ButtonIcon
          iconName="save"
          onClick={() => {
            handleClickSave();
          }}
          disabled={!enableSave}
          loading={assistanceLoading}
        />
      </FloatMenu>
    </Fragment>
  ) : (
    <Fragment>
      <AssistanceList editAssistance={editAssistance} isSaving={isSaving} />
      <FloatMenu>
        <ButtonIcon iconName="home" onClick={handleClickHome} />
        <ButtonIcon iconName="refresh" onClick={handleClickRefresh} />
        <ButtonIcon iconName="add" onClick={handleClickNew} />
      </FloatMenu>
    </Fragment>
  );
};

export default Assistance;
