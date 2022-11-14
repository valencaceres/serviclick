import { useEffect } from "react";
import type { NextPage } from "next";

import Welcome from "../components/functional/Welcome";

import { useUI, useProduct } from "../hooks";

const Home: NextPage = () => {
  const { setAgentUI, retail } = useUI();
  const { resetProduct, resetProductList } = useProduct();

  useEffect(() => {
    setAgentUI(retail.id);
    resetProduct();
    resetProductList();
  }, []);

  return <Welcome />;
};

export default Home;
