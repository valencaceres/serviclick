import { useEffect, Fragment } from "react";
import { useRouter } from "next/router";

import FloatMenu from "../../components/ui/FloatMenu";
import ButtonIcon from "../../components/ui/ButtonIcon";

import { useUI } from "../../hooks";
import { CaseList } from "../../components/functional/Case";

const CasePage = () => {
  const router = useRouter();

  const { setTitleUI, filters } = useUI();

  const handleClickHome = () => {
    router.push("/");
  };

  const handleClickRefresh = () => {};

  const handleClickNew = () => {
    router.push("/case/new");
  };

  const handleViewCase = (id: string) => {
    router.push(`/case/${id}`);
  };

  useEffect(() => {
    setTitleUI("Casos");
  }, [router]);

  return (
    <Fragment>
      <CaseList viewCase={handleViewCase} />
      <FloatMenu>
        <ButtonIcon iconName="home" onClick={handleClickHome} />
        <ButtonIcon iconName="refresh" onClick={handleClickRefresh} />
        <ButtonIcon iconName="add" onClick={handleClickNew} />
      </FloatMenu>
    </Fragment>
  );
};

export default CasePage;
