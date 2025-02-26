import { type NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";

import { Reimbursement } from "~/components/functional/_operations/Reimbursement/Reimbursement";
import { useUI } from "~/store/hooks";

const ReimbursementPage: NextPage = () => {
  const { setTitle } = useUI();

  useEffect(() => {
    setTitle("Reembolsos");
  }, [setTitle]);

  return (
    <>
      <Head>
        <title>Serviclick.cl - Reembolsos</title>
        <meta name="description" content="Serviclick Admin Module" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Reimbursement />
    </>
  );
};

export default ReimbursementPage;
