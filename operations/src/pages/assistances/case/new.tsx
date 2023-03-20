import { useEffect, Fragment } from "react";
import { useRouter } from "next/router";

import FloatMenu from "../../../components/ui/FloatMenu";
import ButtonIcon from "../../../components/ui/ButtonIcon";

import { useUI } from "../../../hooks";
import CaseStageList from "../../../components/functional/_assistances/Case/CaseStageList";
import {
  Content,
  ContentHalfRow,
} from "../../../components/layout/ResponsiveContent";
import CaseFormNew from "../../../components/functional/_assistances/Case/CaseFormNew";

const NewCasePage = () => {
  const router = useRouter();

  const { setTitleUI, filters } = useUI();

  const handleClickHome = () => {
    router.push("/");
  };

  const handleClickBack = () => {
    router.back();
  };

  useEffect(() => {
    setTitleUI(`Nuevo caso`);
  }, [router]);

  return (
    <Fragment>
      <ContentHalfRow>
        <CaseFormNew />
        <CaseStageList />
      </ContentHalfRow>
      <FloatMenu>
        <ButtonIcon iconName="home" onClick={handleClickHome} />
        <ButtonIcon iconName="arrow_back" onClick={handleClickBack} />
      </FloatMenu>
    </Fragment>
  );
};

export default NewCasePage;
