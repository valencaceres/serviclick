import { useEffect, Fragment } from "react";
import { useRouter } from "next/router";

import FloatMenu from "../../../components/ui/FloatMenu";
import ButtonIcon from "../../../components/ui/ButtonIcon";

import { RetailDetail } from "../../../components/functional/_entities/Retail";

import { useUI } from "../../../hooks";

const RetailPage = () => {
  const router = useRouter();

  const { setTitleUI } = useUI();

  const handleClickHome = () => {
    router.push("/");
  };

  const handleClickBack = () => {
    router.push("/entities/retail");
  };

  useEffect(() => {
    setTitleUI("Empresa");
  }, []);

  return (
    <Fragment>
      <RetailDetail />
      <FloatMenu>
        <ButtonIcon iconName="home" onClick={handleClickHome} />
        <ButtonIcon iconName="arrow_back" onClick={handleClickBack} />
      </FloatMenu>
    </Fragment>
  );
};

export default RetailPage;
