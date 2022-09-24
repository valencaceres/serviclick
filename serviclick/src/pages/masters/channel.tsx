import { useEffect } from "react";
import { useRouter } from "next/router";

import { ChannelList } from "../../components/functional/_masters/Channel";

import useUI from "../../hooks/useUI";
import useChannel from "../../hooks/useChannel";

const Channel = () => {
  const router = useRouter();

  const { setTitleUI } = useUI();
  const { listAll } = useChannel();

  useEffect(() => {
    setTitleUI("Canal");
    listAll();
  }, []);

  return <ChannelList />;
};

export default Channel;
