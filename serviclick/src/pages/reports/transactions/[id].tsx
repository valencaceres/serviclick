import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";

import FloatMenu from "../../../components/ui/FloatMenu";
import ButtonIcon from "../../../components/ui/ButtonIcon";

import { useUI } from "../../../hooks";
import TransactionDetails from "~/components/functional/_reports/Transactions/TransactionDetails";

type SearchFormT = {
  channelId: string;
  clientType: string;
  rut: string;
  name: string;
  period: string;
  statusId: string;
};

const Transactions = () => {
  const router = useRouter();

  const { setTitleUI } = useUI();
  const handleClickHome = () => {
    router.push("/");
  };

  const handleClickBack = () => {
    router.push("/reports/transactions");
  };

  useEffect(() => {
    setTitleUI("Transacciones");
  }, []);

  return (
    <Fragment>
      <TransactionDetails />
      <FloatMenu>
        <ButtonIcon onClick={handleClickHome} iconName="home" />
        <ButtonIcon onClick={handleClickBack} iconName="arrow_back" />
      </FloatMenu>
    </Fragment>
  );
};

export default Transactions;
