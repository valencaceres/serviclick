import { type NextPage } from "next";
import { useEffect } from "react";
import { Payment } from "~/components/functional/Payment/index";

import { useUI } from "~/store/hooks/index";

const PaymentPage: NextPage = () => {
  const { setTitle } = useUI();

  useEffect(() => {
    setTitle("Procesados");
  }, [setTitle]);

  return <Payment />;
};

export default PaymentPage;
