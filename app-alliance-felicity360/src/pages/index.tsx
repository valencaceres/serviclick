import Head from "next/head";

import Hero from "@/components/ui/Hero/Hero";

export default function Home() {
  return (
    <>
      <Head>
        <title>Serviclick - Todas las soluciones en la palma de tu mano</title>
        <meta name="description" content="Serviclick - Todas las soluciones en la palma de tu mano" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/img/hero/logocolor.png" />
      </Head>

      <main>
        <Hero title="TITULO"/>
      </main>
    </>
  )
}
