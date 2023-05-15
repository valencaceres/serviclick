import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";

import FloatMenu from "~/components/ui/FloatMenu";
import ButtonIcon from "~/components/ui/ButtonIcon";

import { BrokerDetail } from "~/components/functional/_channels/Broker";

import { useUI, useBroker, useProduct } from "~/hooks";

import { channels } from "~/data/masters";

const BrokerDetailPage = () => {
  const router = useRouter();

  const { setTitleUI } = useUI();
  const { broker, getAllBrokers, getBrokerById } = useBroker();
  const { getAllProducts } = useProduct();

  const [enableSave, setEnableSave] = useState(false);

  const handleClickHome = () => {
    router.push("/");
  };

  const handleClickBack = () => {
    router.push("/channels/broker");
  };

  useEffect(() => {
    setTitleUI(`Broker - ${broker.name}`);
    getBrokerById(router.query.id as string);
  }, []);

  return (
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
  );
};

export default BrokerDetailPage;
