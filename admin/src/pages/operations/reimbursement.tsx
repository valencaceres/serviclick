import { type NextPage } from "next";
import Head from "next/head";

import { Reimbursement } from "~/components/functional/_operations/Reimbursement/Reimbursement";

const ReimbursementPage: NextPage = () => {
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
