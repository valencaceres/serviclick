import { type NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";

import { Imed } from "~/components/functional/_operations/IMED/Imed";
import { useUI } from "~/store/hooks";

const ImedPage: NextPage = () => {
  const { setTitle } = useUI();

  useEffect(() => {
    setTitle("Descuentos IMED");
  }, [setTitle]);

  return (
    <>
      <Head>
        <title>Serviclick.cl - Descuentos IMED</title>
        <meta name="description" content="Serviclick Admin Module" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Imed />
    </>
  );
};

export default ImedPage;
