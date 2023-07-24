import { ClerkProvider } from "@clerk/nextjs";
import { esES } from "@clerk/localizations";
import { type AppType } from "next/app";

import { api } from "~/utils/api";

import { Layout } from "~/components/layout/Layout";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps} localization={esES}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
