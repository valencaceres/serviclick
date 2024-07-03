import Head from "next/head";

import Detail from "@/components/functional/Detail";

const DetailPage = () => {
  return (
    <>
      <Head>
        <title>Asistencia Integral Pro</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/img/hero/icono.png" />
      </Head>
      <Detail />
    </>
  );
};

export default DetailPage;
