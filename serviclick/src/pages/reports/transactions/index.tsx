import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";

import FloatMenu from "../../../components/ui/FloatMenu";
import ButtonIcon from "../../../components/ui/ButtonIcon";

import {
  TransactionsClient,
  TransactionsList,
} from "../../../components/functional/_reports/Transactions";

import { useUI, useStatus, useTransaction } from "../../../hooks";
import { useUser } from "~/store/hooks";

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
  const {user} = useUser()

  if (typeof window !== 'undefined') {
    if (!user.email) {
      router.push('/')
    }
  }

  const initialDataSearchForm = {
    channelId: "",
    clientType: "",
    rut: "",
    name: "",
    period: "y",
    statusId: "",
  };

  const { setTitleUI } = useUI();
  const { getAllStatus } = useStatus();
  const { resetTransactionList, getByFilters } = useTransaction();

  const [searchForm, setSearchForm] = useState<SearchFormT>(
    initialDataSearchForm
  );

  const handleClickHome = () => {
    router.push("/");
  };

  const handleClickSearch = () => {
    resetTransactionList();

    getByFilters(
      searchForm.channelId,
      searchForm.clientType,
      searchForm.rut,
      searchForm.period,
      searchForm.statusId
    );
  };

  useEffect(() => {
    setTitleUI("Transacciones");
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
      <TransactionsList
        setSearchForm={setSearchForm}
        searchForm={searchForm}
        search={handleClickSearch}
      />
      <FloatMenu>
        <ButtonIcon iconName="home" onClick={handleClickHome} />
        <ButtonIcon iconName="refresh" onClick={handleClickSearch} />
      </FloatMenu>
    </Fragment>
  );
};

export default Transactions;
