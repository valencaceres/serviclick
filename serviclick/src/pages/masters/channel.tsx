import { useEffect } from "react";
import { useRouter } from "next/router";

import useUI from "../../hooks/useUI";

const Channel = () => {
  const { setTitleUI } = useUI();

  useEffect(() => {
    setTitleUI("Canal");
  }, [setTitleUI]);

  return <div>channels</div>;
};

export default Channel;
