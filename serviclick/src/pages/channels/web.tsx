import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";

import FloatMenu from "../../components/ui/FloatMenu";
import ButtonIcon from "../../components/ui/ButtonIcon";

import {
  AgentDetail,
  AgentList,
} from "../../components/functional/_channels/Agent";
import agentZustand from "~/store/hooks/useAgent";
import { useUI, useAgent, useProduct } from "../../hooks";

import { channels } from "../../data/masters";

const WebPage = () => {
  const router = useRouter();
  const { agent, getAgentById, resetAgent } = agentZustand();
  const { setTitleUI } = useUI();
  const { listAll } = useAgent();
  const { getAllProducts } = useProduct();

  const [showModal, setShowModal] = useState(false);
  const [channel_id, setChannel_id] = useState(channels.web.id);

  const handleClickHome = () => {
    router.push("/");
  };

  const handleClickRefresh = () => {
    listAll(channel_id);
  };

  const handleClickBack = () => {
    router.push("/channels/web");
  };

  const handleClickEdit = (id: string) => {
    router.push(`/channels/web?id=${id}`);
  };

  useEffect(() => {
    setTitleUI(channels.retail.name);
    listAll(channel_id);
    getAllProducts("020579a3-8461-45ec-994b-ad22ff8e3275");
  }, []);

  useEffect(() => {
    resetAgent();
    if (router.query.id !== "" && router.query.id !== "new") {
      router.query.id && getAgentById(router.query.id?.toString());
    }
  }, [router.query]);

  return router.isReady && router.query.id ? (
    <Fragment>
      <AgentDetail />
      <FloatMenu>
        <ButtonIcon iconName="home" onClick={handleClickHome} />
        <ButtonIcon iconName="arrow_back" onClick={handleClickBack} />
      </FloatMenu>
    </Fragment>
  ) : (
    <Fragment>
      <AgentList
        channel_id={channel_id}
        setShowModal={setShowModal}
        showModal={showModal}
        handleClickEdit={handleClickEdit}
      />
      <FloatMenu>
        <ButtonIcon iconName="home" onClick={handleClickHome} />
        <ButtonIcon iconName="refresh" onClick={handleClickRefresh} />
      </FloatMenu>
    </Fragment>
  );
};

export default WebPage;
