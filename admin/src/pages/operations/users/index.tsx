import { type NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";

import { Users } from "~/components/functional/_operations/Users/UserIndex";
import { useUI } from "~/store/hooks";

const UsersPage: NextPage = () => {
  const { setTitle } = useUI();

  useEffect(() => {
    setTitle("Operadores");
  }, [setTitle]);

  return (
    <>
      <Head>
        <title>Serviclick.cl - Operadores</title>
        <meta name="description" content="Serviclick Admin Module" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Users />
    </>
  );
};

export default UsersPage;
