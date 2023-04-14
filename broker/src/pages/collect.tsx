import { useEffect } from "react";

import Collect from "../components/functional/_collect";

import { useUI, useBroker } from "../hooks";

const collect = () => {
  const { setTitleUI, broker } = useUI();
  const { getCollectById } = useBroker();

  useEffect(() => {
    setTitleUI("Cobranza");
    getCollectById(broker.id);
  }, []);

  return <Collect />;
};

export default collect;
