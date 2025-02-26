import { type NextPage } from "next";
import { useEffect } from "react";
import { Billing } from "~/components/functional/Billing/Billing";

import { useUI } from "~/store/hooks/index";

const BillingPage: NextPage = () => {
  const { setTitle } = useUI();

  useEffect(() => {
    setTitle("Cobranza");
  }, [setTitle]);

  return <Billing />;
};

export default BillingPage;
