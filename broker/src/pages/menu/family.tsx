import { useEffect, Fragment } from "react";
import { useRouter } from "next/router";

import Family from "../../components/functional/_menu/Family";

import ButtonIcon from "../../components/ui/ButtonIcon";
import FloatMenu from "../../components/ui/FloatMenu";

import { useUI, useBroker } from "../../hooks";

const FamilyPage = () => {
  const router = useRouter();

  const { broker, setTitleUI } = useUI();
  const { getFamiliesByBrokerId } = useBroker();

  const handleClickHome = () => {
    router.push("/");
  };

  useEffect(() => {
    setTitleUI("Familias");
    getFamiliesByBrokerId(broker.id);
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
