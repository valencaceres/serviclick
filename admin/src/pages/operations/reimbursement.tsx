import { type NextPage } from "next";
import Head from "next/head";

import { ReimbursementComponent } from "~/components/functional/_operations/Reimbursement/Reimbursement";

const ReimbursementPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Serviclick.cl - Reembolsos</title>
        <meta name="description" content="Serviclick Admin Module" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ReimbursementComponent />
    </>
  );
};

export default ReimbursementPage;
