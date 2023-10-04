import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";

import FloatMenu from "../../../components/ui/FloatMenu";
import ButtonIcon from "../../../components/ui/ButtonIcon";

import { ContractorDetail } from "../../../components/functional/_entities/Contractor";

import { useUI } from "../../../hooks";
import { useQueryContractor } from "~/hooks/query";

const ContractorDetailPage = () => {
  const router = useRouter();

  const { setTitleUI } = useUI();

  const { data: contractor } = useQueryContractor().useGetById(
    router.query.id as string
  );

  const handleClickHome = () => {
    router.push("/");
  };

  const handleClickBack = () => {
    router.push("/entities/contractor");
  };

  useEffect(() => {
    setTitleUI("Cliente");
  }, []);

  return (
    <Fragment>
      <ContractorDetail contractor={contractor} />
      <FloatMenu>
        <ButtonIcon iconName="home" onClick={handleClickHome} />
        <ButtonIcon iconName="arrow_back" onClick={handleClickBack} />
      </FloatMenu>
    </Fragment>
  );
};

export default ContractorDetailPage;
