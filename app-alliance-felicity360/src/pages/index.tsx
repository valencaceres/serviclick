import Head from "next/head";

import Hero from "@/components/ui/Hero/Hero";
import Paragraph from "@/components/ui/Paragraph/Paragraph";
import Card from "@/components/ui/Card/Card";

export default function Home() {
  const content = "Junto a Felicity 360, te brindamos las mejores Asistencias diseñadas especialmente para ti y tu seres queridos. ";


  const wordsWithStyles = [
    {


      word: "360,", color: "#29ABE2", fontWeight: "bolder"
    },
    {
      word: "Felicity", color: "#DE0079", fontWeight: "bolder"
    },

  ];

  return (
    <>
      <Head>
        <title>Serviclick - Todas las soluciones en la palma de tu mano</title>
        <meta name="description" content="Serviclick - Todas las soluciones en la palma de tu mano" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/img/hero/logocolor.png" />
      </Head>

      <main>
        <Hero title="ASISTENCIAS QUE TE PROTEGEN <br> EN TODO MOMENTO" firstLogo="/img/hero/serviclick.png" secondLogo="/img/hero/logo-felicity-white.png" />
        <Card title="Hola" paragraph="soy" traced=" una" priceText="card" discountText="20%" beneficiaryText="hola"></Card>
        <Paragraph content={content} wordsWithStyles={wordsWithStyles} />
      </main>
    </>
  )
}
