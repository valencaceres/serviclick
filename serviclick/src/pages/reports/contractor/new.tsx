import { useEffect, Fragment } from "react";
import { useRouter } from "next/router";

import FloatMenu from "../../../components/ui/FloatMenu";
import ButtonIcon from "../../../components/ui/ButtonIcon";

import { useUI, useContractor } from "../../../hooks";
import ContractorForm from "~/components/functional/_entities/Contractor/ContractorForm";

const ContractorNewPage = () => {
  const router = useRouter();

  const { setTitleUI } = useUI();

  const handleClickHome = () => {
    router.push("/reports/contractor");
  };

  const handleClickBack = () => {
    router.back();
  };

  useEffect(() => {
    setTitleUI(
      router.query.type === "C" ? "Nueva empresa" : "Nueva persona natural"
    );
  }, []);

  return (
    <Fragment>
      <ContractorForm />
      <FloatMenu>
        <ButtonIcon iconName="home" onClick={handleClickHome} />
        <ButtonIcon iconName="arrow_back" onClick={handleClickBack} />
      </FloatMenu>
    </Fragment>
  );
};

export default ContractorNewPage;
