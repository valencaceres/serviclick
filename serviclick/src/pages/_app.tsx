import { Provider } from "react-redux";
import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { useRouter } from "next/router";

import store from "../redux/store";

import Switch from "../components/functional/Switch";

import "../styles/app.css";

import type { AppProps } from "next/app";
import { esES } from "@clerk/localizations";

const publicPages: Array<string> = ["/sign-in/[[...index]]"];

function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();

  const isPublicPage = publicPages.includes(pathname);
  return (
    <ClerkProvider {...pageProps} localization={esES}>
      {isPublicPage ? (
        <Provider store={store}>
          <Switch>
            <Component {...pageProps} />
          </Switch>
        </Provider>
      ) : (
        <>
          <SignedIn>
            <Provider store={store}>
              <Switch>
                <Component {...pageProps} />
              </Switch>
            </Provider>
          </SignedIn>
          <SignedOut>
            <RedirectToSignIn />
          </SignedOut>
        </>
      )}
    </ClerkProvider>
  );
}

export default MyApp;
