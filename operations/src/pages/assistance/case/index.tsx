import { useEffect, Fragment } from "react";
import { useRouter } from "next/router";

import FloatMenu from "~/components/ui/FloatMenu";
import ButtonIcon from "~/components/ui/ButtonIcon";

import CaseTable from "~/components/functional/_assistances/Case/CaseTable";

import { useUI } from "~/hooks";
import { useCase } from "~/store/hooks";

const CasePage = () => {
  const router = useRouter();

  const { setTitleUI, filters } = useUI();
  const { reset } = useCase();

  const handleClickHome = () => {
    router.push("/");
  };

  const handleClickRefresh = () => {};

  const handleClickNew = () => {
    reset();
    router.push("/assistance/case/applicant/new");
  };

  useEffect(() => {
    setTitleUI("Casos");
  }, [router]);

  return (
    <Fragment>
      <CaseTable />
      <FloatMenu>
        <ButtonIcon iconName="home" onClick={handleClickHome} />
        <ButtonIcon iconName="refresh" onClick={handleClickRefresh} />
        <ButtonIcon iconName="add" onClick={handleClickNew} />
      </FloatMenu>
    </Fragment>
  );
};

export default CasePage;
