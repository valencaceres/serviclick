import { useEffect, Fragment } from "react";
import { useRouter } from "next/router";

import Family from "../../components/functional/_menu/Family";

import ButtonIcon from "../../components/ui/ButtonIcon";
import FloatMenu from "../../components/ui/FloatMenu";

import { useUI, useRetail } from "../../hooks";

const FamilyPage = () => {
  const router = useRouter();

  const { retail, setTitleUI } = useUI();
  const { getFamiliesByRetailId } = useRetail();

  const handleClickHome = () => {
    router.push("/");
  };

  useEffect(() => {
    setTitleUI("Familias");
    getFamiliesByRetailId(retail.id);
  }, []);

  return (
    <Fragment>
      <Family />
      <FloatMenu>
        <ButtonIcon iconName="home" onClick={handleClickHome} />
      </FloatMenu>
    </Fragment>
  );
};

export default FamilyPage;
