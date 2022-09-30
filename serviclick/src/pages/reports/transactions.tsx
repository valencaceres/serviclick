import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";

import FloatMenu from "../../components/ui/FloatMenu";
import ButtonIcon from "../../components/ui/ButtonIcon";

import {
  TransactionsClient,
  TransactionsList,
} from "../../components/functional/_reports/Transactions";

import { useUI, useChannel, useStatus } from "../../hooks";

const Transactions = () => {
  const router = useRouter();

  const { setTitleUI } = useUI();
  const { listAll: getAllChannels } = useChannel();
  const { getAllStatus } = useStatus();

  useEffect(() => {
    setTitleUI("Transacciones");
    getAllChannels();
    getAllStatus();
  }, []);

  return router.isReady && router.query.id ? (
    <Fragment>
      <TransactionsClient />
      <FloatMenu>
        <ButtonIcon iconName="home" />
        <ButtonIcon iconName="arrow_back" />
        <ButtonIcon iconName="add" />
        <ButtonIcon iconName="save" />
      </FloatMenu>
    </Fragment>
  ) : (
    <Fragment>
      <TransactionsList />
      <FloatMenu>
        <ButtonIcon iconName="home" />
        <ButtonIcon iconName="cloud_download" />
      </FloatMenu>
    </Fragment>
  );
};

export default Transactions;
