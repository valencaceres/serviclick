import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";

import FloatMenu from "../../components/ui/FloatMenu";
import ButtonIcon from "../../components/ui/ButtonIcon";

import {
  BrokerDetail,
  BrokerList,
} from "../../components/functional/_channels/Broker";

import { useUI, useBroker, useProduct } from "../../hooks";

import { channels } from "../../data/masters";

const Web = () => {
  const router = useRouter();

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

  const [enableSave, setEnableSave] = useState(false);

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
      <BrokerDetail setEnableButtonSave={setEnableSave} />
      <FloatMenu>
        <ButtonIcon iconName="home" onClick={handleClickHome} />
        <ButtonIcon iconName="arrow_back" onClick={handleClickBack} />
        {/* <ButtonIcon iconName="add" onClick={handleClickNew} />
        <ButtonIcon
          iconName="save"
          onClick={handleClickSave}
          disabled={!enableSave}
          loading={brokerLoading}
        /> */}
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

export default Web;
