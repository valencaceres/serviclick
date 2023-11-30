import { type NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";

import { Hero } from "~/components/functional/_operations/Hero/Hero";
import { useUI } from "~/store/hooks";

const ImedPage: NextPage = () => {
  const { setTitle } = useUI();

  useEffect(() => {
    setTitle("Archivos Familias");
  }, [setTitle]);

  return (
    <>
      <Head>
        <title>Serviclick.cl - Subir Archivos Familias </title>
        <meta name="description" content="Serviclick Admin Module" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero type="family" />
    </>
  );
};

export default ImedPage;
