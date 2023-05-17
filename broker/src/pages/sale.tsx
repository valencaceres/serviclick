import { type NextPage } from "next";
import { useEffect } from "react";

import { Sale } from "~/components/functional/Sale";

import { useUI } from "~/store/hooks";

const SalePage: NextPage = () => {
  const { setTitle } = useUI();

  useEffect(() => {
    setTitle("Venta");
  }, [setTitle]);
  
  return <Sale />;
};

export default SalePage;
