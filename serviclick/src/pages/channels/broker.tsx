import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";

import FloatMenu from "../../components/ui/FloatMenu";
import ButtonIcon from "../../components/ui/ButtonIcon";

import {
  BrokerDetail,
  BrokerList,
} from "../../components/functional/_channels/Broker";

import { useUI, useBroker, useProduct, useDistrict } from "../../hooks";
import { useUser } from "~/store/hooks";

import { channels } from "../../data/masters";

const BrokerPage = () => {
  const router = useRouter();
  const {user} = useUser()

  if (typeof window !== 'undefined') {
    if (!user.email) {
      router.push('/')
    }
  }

  const { setTitleUI } = useUI();
  const {
    getAllBrokers,
    getBrokerById,
    deleteBrokerById,
    reset,
    createBroker,
    broker,
    loading: brokerLoading,
  } = useBroker();
  const { getAllProducts } = useProduct();
  const { listAllDistrict } = useDistrict();

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

  const handleClickBack = () => {
    router.push("/channels/broker");
  };

  const handleClickEdit = (id: string) => {
    router.push(`/channels/broker?id=${id}`);
  };

  const handleClickDelete = (id: string) => {
    deleteBrokerById(id);
  };

  const handleClickSave = () => {
    createBroker(broker);
  };

  useEffect(() => {
    setTitleUI(channels.broker.name);
    listAllDistrict();
    getAllBrokers();
    getAllProducts("020579a3-8461-45ec-994b-ad22ff8e3275");
  }, []);

  useEffect(() => {
    reset();
    if (router.query.id !== "" && router.query.id !== "new") {
      router.query.id && getBrokerById(router.query.id?.toString());
    }
  }, [router.query]);

  return router.isReady && router.query.id ? (
    <Fragment>
      <BrokerDetail />
      <FloatMenu>
        <ButtonIcon iconName="home" onClick={handleClickHome} />
        <ButtonIcon iconName="arrow_back" onClick={handleClickBack} />
        <ButtonIcon iconName="add" onClick={handleClickNew} />
      </FloatMenu>
    </Fragment>
  ) : (
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

export default BrokerPage;
