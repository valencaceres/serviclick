import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";

import FloatMenu from "../../components/ui/FloatMenu";
import ButtonIcon from "../../components/ui/ButtonIcon";

import { AgentList } from "../../components/functional/_channels/Agent";

import { useUI, useAgent } from "../../hooks";

import { channels } from "../../data/masters";

const Web = () => {
  const router = useRouter();

  const { setTitleUI } = useUI();
  const { listAll } = useAgent();

  const [showModal, setShowModal] = useState(false);
  const [channel_id, setChannel_id] = useState(channels.web.id);

  const handleClickHome = () => {
    router.push("/");
  };

  const handleClickRefresh = () => {
    listAll(channel_id);
  };

  useEffect(() => {
    setTitleUI("Internet");
    listAll(channel_id);
  }, []);

  return (
    <Fragment>
      <AgentList
        channel_id={channel_id}
        setShowModal={setShowModal}
        showModal={showModal}
      />
      <FloatMenu>
        <ButtonIcon iconName="home" onClick={handleClickHome} />
        <ButtonIcon iconName="refresh" onClick={handleClickRefresh} />
        {/* <ButtonIcon iconName="add" onClick={handleClickNew} /> */}
      </FloatMenu>
    </Fragment>
  );
};

export default Web;
