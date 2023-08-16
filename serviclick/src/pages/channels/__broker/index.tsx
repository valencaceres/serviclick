import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";

import FloatMenu from "~/components/ui/FloatMenu"; 
import ButtonIcon from "~/components/ui/ButtonIcon"; 

import { BrokerList } from "~/components/functional/_channels/Broker";

import { useUI, useBroker, useProduct } from "~/hooks";

import { channels } from "~/data/masters";

const BrokerListPage = () => {
  const router = useRouter();

  const { setTitleUI } = useUI();
  const {
    getAllBrokers,
    getBrokerById,
    deleteBrokerById,
    reset,
    broker,
    loading
  } = useBroker();
  const { getAllProducts } = useProduct();

  const handleClickHome = () => {
    router.push("/");
  };

  const handleClickRefresh = () => {
    getAllBrokers();
  };

  const handleClickNew = () => {
    reset();
    router.push("/channels/broker?id=new");
  };

  const handleClickEdit = (id: string) => {
    router.push(`/channels/broker/${id}`);
  };

  const handleClickDelete = (id: string) => {
    deleteBrokerById(id);
  };

  useEffect(() => {
    setTitleUI(channels.broker.name);
    getAllBrokers();
    getAllProducts("020579a3-8461-45ec-994b-ad22ff8e3275");
  }, []);

  useEffect(() => {
    reset();
    if (router.query.id !== "" && router.query.id !== "new") {
      router.query.id && getBrokerById(router.query.id?.toString());
    }
  }, [router.query]);

  return (
    <Fragment>
      <BrokerList
        editBroker={handleClickEdit}
        deleteBroker={handleClickDelete}
      />
      <FloatMenu>
        <ButtonIcon iconName="home" onClick={handleClickHome} />
        <ButtonIcon iconName="refresh" onClick={handleClickRefresh} />
        <ButtonIcon iconName="add" onClick={handleClickNew} />
      </FloatMenu>
    </Fragment>
  );
};

export default BrokerListPage;
