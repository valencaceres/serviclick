import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";

import FloatMenu from "../../../components/ui/FloatMenu";
import ButtonIcon from "../../../components/ui/ButtonIcon";
import ModalWindow from "../../../components/ui/ModalWindow";

import { ImportDetail } from "../../../components/functional/_assistances/Import";

import { useUI, useDistrict } from "../../../hooks";

const ImportDetailPage = () => {
  const router = useRouter();

  const { setTitleUI } = useUI();

  const handleClickHome = () => {
    router.push("/");
  };

  const handleClickRefresh = () => {};

  const handleClickBack = () => {
    router.back();
  };

  useEffect(() => {
    setTitleUI("Importaciones");
  }, []);

  useEffect(() => {
    setTitleUI("Detalle de importación");
    // if (router.query?.id) {
    //   if (router.query.id !== "" && router.query.id !== "new") {
    //     getPartnerById(router.query.id?.toString());
    //   }
    // }
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
