import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { esES } from "@clerk/localizations";
import { useRouter } from "next/router";
import { type AppType } from "next/app";

import { api } from "~/utils/api";

import { Layout } from "~/components/layout/Layout";

import "~/styles/globals.css";

const publicPages: Array<string> = ["/sign-in/[[...index]]"];

const MyApp: AppType = ({ Component, pageProps }) => {
  const { pathname } = useRouter();

  const isPublicPage = publicPages.includes(pathname);

  return (
    <ClerkProvider {...pageProps} localization={esES}>
      {isPublicPage ? (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      ) : (
        <>
          <SignedIn>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </SignedIn>
          <SignedOut>
            <RedirectToSignIn />
          </SignedOut>
        </>
      )}
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
