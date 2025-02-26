import { esES } from "@clerk/localizations";
import { type AppType } from "next/app";

import { Layout } from "~/components/layout/Layout";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
  );
};

export default MyApp;
