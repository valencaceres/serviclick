import Head from "next/head";
import { useEffect } from "react";

import { useProduct } from "@/store/hooks";

import Landing from "@/components/functional/Landing/Landing";

export default function Home() {
  const {getProductList} = useProduct()

  useEffect(() => {
    getProductList()
  },[])

  return (
    <>
      <Head>
        <title>Serviclick - Todas las soluciones en la palma de tu mano</title>
        <meta
          name="description"
          content="Serviclick - Todas las soluciones en la palma de tu mano"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/img/hero/icono.png" />
      </Head>
      <Landing />
    </>
  );
}
