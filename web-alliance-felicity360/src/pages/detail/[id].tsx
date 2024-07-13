import Head from "next/head";

import Detail from "@/components/functional/Detail";

import { useProduct } from "@/store/hooks";

const DetailPage = () => {
  const { product } = useProduct();

  return (
    <>
      <Head>
        <title>{product.product_name}</title>
        <meta name="description" content="Asistencia Integral Pro" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/img/hero/icono.png" />
      </Head>
      <Detail />
    </>
  );
};

export default DetailPage;
