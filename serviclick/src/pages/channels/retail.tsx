import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";

import FloatMenu from "../../components/ui/FloatMenu";
import ButtonIcon from "../../components/ui/ButtonIcon";

import {
  RetailDetail,
  RetailList,
} from "../../components/functional/_channels/Retail";

import { useUI, useRetail, useProduct, useDistrict } from "../../hooks";
import { useUser } from "~/store/hooks";


import { channels } from "../../data/masters";

const RetailPage = () => {
  const router = useRouter();
  const {user} = useUser()

  if (typeof window !== 'undefined') {
    if (!user.email) {
      router.push('/')
    }
  }

  const { setTitleUI } = useUI();
  const {
    getAllRetails,
    getRetailById,
    deleteRetailById,
    reset,
    createRetail,
    retail,
    loading: retailLoading,
  } = useRetail();
  const { getAllProducts } = useProduct();
  const { listAllDistrict } = useDistrict();

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
    createRetail(retail);
  };

  useEffect(() => {
    setTitleUI(channels.retail.name);
    listAllDistrict();
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
      <RetailDetail />
      <FloatMenu>
        <ButtonIcon iconName="home" onClick={handleClickHome} />
        <ButtonIcon iconName="arrow_back" onClick={handleClickBack} />
        <ButtonIcon iconName="add" onClick={handleClickNew} />
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

export default RetailPage;
