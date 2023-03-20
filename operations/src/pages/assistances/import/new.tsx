import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";

import FloatMenu from "../../../components/ui/FloatMenu";
import ButtonIcon from "../../../components/ui/ButtonIcon";
import ModalWindow from "../../../components/ui/ModalWindow";

import ImportForm from "../../../components/functional/_assistances/Import/ImportForm";

import { useUI, useDistrict } from "../../../hooks";
import { Content } from "../../../components/layout/Content";

const ImportsPage = () => {
  const router = useRouter();

  const { setTitleUI, filters } = useUI();

  const [isSaving, setIsSaving] = useState(false);
  const [enableSave, setEnableSave] = useState(false);

  const handleClickHome = () => {
    router.push("/");
  };

  const handleClickBack = () => {
    router.back();
  };

  useEffect(() => {
    setTitleUI("Importación de archivo");
  }, [router]);

  return (
    <Fragment>
      <Content align="center">
        <ImportForm />
      </Content>
      <FloatMenu>
        <ButtonIcon iconName="home" onClick={handleClickHome} />
        <ButtonIcon iconName="arrow_back" onClick={handleClickBack} />
      </FloatMenu>
    </Fragment>
  );
};

export default ImportsPage;
