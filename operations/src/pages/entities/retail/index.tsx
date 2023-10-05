import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";

import FloatMenu from "../../../components/ui/FloatMenu";
import ButtonIcon from "../../../components/ui/ButtonIcon";

import { RetailList } from "../../../components/functional/_entities/Retail";

import { useUI, useRetail, useDistrict } from "../../../hooks";

const RetailPage = () => {
  const router = useRouter();

  const { setTitleUI, filters } = useUI();
  const { listAllDistrict } = useDistrict();
  const { getBySearchValues, resetRetail, retailLoading } = useRetail();

  const [isSaving, setIsSaving] = useState(false);
  const [showModalType, setShowModalType] = useState(false);

  const handleClickHome = () => {
    router.push("/");
  };

  const handleClickRefresh = () => {
    getBySearchValues(filters?.rut || "", filters?.name || "");
  };

  const handleClickEdit = (id: string) => {
    resetRetail();
    router.push(`/entities/retail/${id}`);
  };

  useEffect(() => {
    setTitleUI("Empresas");
    listAllDistrict();
    getBySearchValues(filters?.rut || "", filters?.name || "");
  }, []);

  useEffect(() => {
    if (isSaving === true && retailLoading === false) {
      getBySearchValues(filters?.rut || "", filters?.name || "");
      setIsSaving(false);
    }
  }, [isSaving, retailLoading]);

  return (
    <Fragment>
      <RetailList />
      <FloatMenu>
        <ButtonIcon iconName="home" onClick={handleClickHome} />
        <ButtonIcon iconName="refresh" onClick={handleClickRefresh} />
      </FloatMenu>
    </Fragment>
  );
};

export default RetailPage;
