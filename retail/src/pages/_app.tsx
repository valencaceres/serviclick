import { ClerkProvider } from "@clerk/nextjs";
import { esES } from "@clerk/localizations";
import { type AppType } from "next/app";

import { Layout } from "~/components/layout/Layout";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  console.log("MyApp rendering");
  return (
    <ClerkProvider {...pageProps} localization={esES}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ClerkProvider>
  );
};

export default MyApp;
