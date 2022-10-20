import { useEffect } from "react";
import { useRouter } from "next/router";

import * as Product from "../../components/functional/Product";

import { useUI } from "../../redux/hooks";

const BiciCulturaPage = () => {
  const router = useRouter();

  const { setAgentUI } = useUI();

  const Component = Product["BiciCultura"];

  useEffect(() => {
    setAgentUI("23027cc2-c294-4125-8d61-c8b23626d996");
  }, []);

  return <Component />;
};

export default BiciCulturaPage;
