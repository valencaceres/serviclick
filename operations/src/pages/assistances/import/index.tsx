import { useEffect, Fragment } from "react";
import { useRouter } from "next/router";

import FloatMenu from "../../../components/ui/FloatMenu";
import ButtonIcon from "../../../components/ui/ButtonIcon";

import { ImportList } from "../../../components/functional/_assistances/Import";

import { useUI, useDistrict } from "../../../hooks";
import { useQueryImport } from "../../../hooks/query";

const ImportsPage = () => {
  const router = useRouter();

  const { setTitleUI, filters } = useUI();
  const { listAllDistrict } = useDistrict();

  const { refetch } = useQueryImport().useGetAll();

  const handleClickHome = () => {
    router.push("/");
  };

  const handleClickRefresh = () => {
    refetch();
  };

  const handleClickNew = () => {
    router.push("/assistances/import/new");
  };

  const handleViewImport = (id: string) => {
    router.push(`/assistances/import/${id}`);
  };

  useEffect(() => {
    setTitleUI("Importaciones");
    listAllDistrict();
  }, []);

  useEffect(() => {
    setTitleUI(router.query?.id ? "Importación" : "Importaciones");
  }, [router]);

  return (
    <Fragment>
      <ImportList viewImport={handleViewImport} />
      <FloatMenu>
        <ButtonIcon iconName="home" onClick={handleClickHome} />
        <ButtonIcon iconName="refresh" onClick={handleClickRefresh} />
        <ButtonIcon iconName="add" onClick={handleClickNew} />
      </FloatMenu>
    </Fragment>
  );
};

export default ImportsPage;
