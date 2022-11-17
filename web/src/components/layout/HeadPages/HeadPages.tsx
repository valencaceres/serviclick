import Head from "next/head";

const HeadPages = ({ title, description }: any) => {
  return (
    <Head>
      <title>{`${title} - ${description}`}</title>
      <meta name={title} content={`${description}`} />
      <link rel="icon" href="/favicon.png" />
    </Head>
  );
};

export default HeadPages;
