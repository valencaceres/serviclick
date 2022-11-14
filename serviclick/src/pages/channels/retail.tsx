import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";

import FloatMenu from "../../components/ui/FloatMenu";
import ButtonIcon from "../../components/ui/ButtonIcon";

import {
  RetailDetail,
  RetailList,
} from "../../components/functional/_channels/Retail";

import { useUI, useRetail, useProduct } from "../../hooks";

import { channels } from "../../data/masters";

const Web = () => {
  const router = useRouter();

  const { setTitleUI } = useUI();
  const {
    getAllRetails,
    getRetailById,
    deleteRetailById,
    reset,
    createRetail,
    retail,
    retailLoading,
  } = useRetail();
  const { getAllProducts } = useProduct();

  const [enableSave, setEnableSave] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleClickHome = () => {
    router.push("/");
  };

  const handleClickRefresh = () => {
    getAllRetails();
  };

  const handleClickNew = () => {
    reset();
    router.push("/channels/retail?id=new");
  };

  const handleClickBack = () => {
    router.push("/channels/retail");
  };

  const handleClickEdit = (id: string) => {
    router.push(`/channels/retail?id=${id}`);
  };

  const handleClickDelete = (id: string) => {
    deleteRetailById(id);
  };

  const handleClickSave = () => {
    setIsSaving(true);
    createRetail(retail);
  };

  useEffect(() => {
    setTitleUI(channels.retail.name);
    getAllRetails();
    getAllProducts("020579a3-8461-45ec-994b-ad22ff8e3275");
  }, []);

  useEffect(() => {
    reset();
    if (router.query.id !== "" && router.query.id !== "new") {
      router.query.id && getRetailById(router.query.id?.toString());
    }
  }, [router.query]);

  return router.isReady && router.query.id ? (
    <Fragment>
      <RetailDetail
        setEnableButtonSave={setEnableSave}
        isSaving={isSaving}
        setIsSaving={setIsSaving}
      />
      <FloatMenu>
        <ButtonIcon iconName="home" onClick={handleClickHome} />
        <ButtonIcon iconName="arrow_back" onClick={handleClickBack} />
        <ButtonIcon iconName="add" onClick={handleClickNew} />
        <ButtonIcon
          iconName="save"
          onClick={handleClickSave}
          disabled={!enableSave}
          loading={retailLoading}
        />
      </FloatMenu>
    </Fragment>
  ) : (
    <Fragment>
      <RetailList
        editRetail={handleClickEdit}
        deleteRetail={handleClickDelete}
      />
      <FloatMenu>
        <ButtonIcon iconName="home" onClick={handleClickHome} />
        <ButtonIcon iconName="refresh" onClick={handleClickRefresh} />
        <ButtonIcon iconName="add" onClick={handleClickNew} />
      </FloatMenu>
    </Fragment>
  );
};

export default Web;
