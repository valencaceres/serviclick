import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";

import FloatMenu from "../../../components/ui/FloatMenu";
import ButtonIcon from "../../../components/ui/ButtonIcon";
import ModalWindow from "../../../components/ui/ModalWindow";

import { ImportDetail } from "../../../components/functional/_assistances/Import";

import { useUI, useDistrict } from "../../../hooks";
import { useQueryImport } from "../../../hooks/query";

const ImportDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { setTitleUI } = useUI();

  const { refetch } = useQueryImport().useGetById_BCI(id as string);

  const handleClickHome = () => {
    router.push("/");
  };

  const handleClickRefresh = () => {
    refetch();
  };

  const handleClickBack = () => {
    router.back();
  };

  useEffect(() => {
    setTitleUI("Detalle de importación");
  }, [router]);

  return (
    <Fragment>
      <ImportDetail />
      <FloatMenu>
        <ButtonIcon iconName="home" onClick={handleClickHome} />
        <ButtonIcon iconName="refresh" onClick={handleClickRefresh} />
        <ButtonIcon iconName="arrow_back" onClick={handleClickBack} />
      </FloatMenu>
    </Fragment>
  );
};

export default ImportDetailPage;
