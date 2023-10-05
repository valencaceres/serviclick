import { type NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";

import { UserEdit } from "~/components/functional/_operations/Users/UserEdit";
import { useUI } from "~/store/hooks";

const NewUserPage: NextPage = () => {
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
      <UserEdit />
    </>
  );
};

export default NewUserPage;
