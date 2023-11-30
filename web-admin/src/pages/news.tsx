import { type NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";

import { Hero } from "~/components/functional/_operations/Hero/Hero";
import { useUI } from "~/store/hooks";

const ImedPage: NextPage = () => {
  const { setTitle } = useUI();

  useEffect(() => {
    setTitle("Archivos Novedades");
  }, [setTitle]);

  return (
    <>
      <Head>
        <title>Serviclick.cl - Subir Archivos Novedades </title>
        <meta name="description" content="Serviclick Admin Module" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero type="news" />
    </>
  );
};

export default ImedPage;
