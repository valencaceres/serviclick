import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";

import FloatMenu from "../../components/ui/FloatMenu";
import ButtonIcon from "../../components/ui/ButtonIcon";

import { ChannelList } from "../../components/functional/_masters/Channel";

import useUI from "../../hooks/useUI";
import useChannel from "../../hooks/useChannel";

const Channel = () => {
  const router = useRouter();

  const { setTitleUI } = useUI();
  const { listAll, reset } = useChannel();

  const [showModal, setShowModal] = useState(false);

  const handleClickHome = () => {
    router.push("/");
  };

  const handleClickRefresh = () => {
    listAll();
  };

  const handleClickNew = () => {
    reset();
    setShowModal(true);
  };

  useEffect(() => {
    setTitleUI("Canales de Venta");
    listAll();
  }, []);

  return (
    <Fragment>
      <ChannelList setShowModal={setShowModal} showModal={showModal} />
      <FloatMenu>
        <ButtonIcon iconName="home" onClick={handleClickHome} />
        <ButtonIcon iconName="refresh" onClick={handleClickRefresh} />
        {/* <ButtonIcon iconName="add" onClick={handleClickNew} /> */}
      </FloatMenu>
    </Fragment>
  );
};

export default Channel;
