import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";

import FloatMenu from "../../../components/ui/FloatMenu";
import ButtonIcon from "../../../components/ui/ButtonIcon";

import { ContractorDetail } from "../../../components/functional/_entities/Contractor";

import { useUI } from "../../../hooks";
import { useQueryContractor } from "~/hooks/query";
import { useCustomer } from "~/store/hooks";
const ContractorDetailPage = () => {
  const router = useRouter();

  const { setTitleUI } = useUI();
  const { contractor: contractor, getContractorById } = useCustomer();

  const [leadProductSelected, setLeadProductSelected] = useState<any>(null);
  const handleClickHome = () => {
    router.push("/");
  };

  const handleClickBack = () => {
    router.push("/reports/contractor");
  };

  useEffect(() => {
    setTitleUI("Cliente");
  }, []);
  useEffect(() => {
    if (router.query.id) {
      getContractorById(router.query.id as string);
    }
  }, [router.query.id]);

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
