import type { NextPage } from "next";
import Head from "next/head";

import texts from "../utils/texts";

const Home: NextPage = () => {
  const { general } = texts;

  return (
    <Head>
      <title>{general.title}</title>
      <meta name="description" content={general.description} />
      <link rel="icon" href="/favicon.png" />
    </Head>
  );
};

export default Home;
