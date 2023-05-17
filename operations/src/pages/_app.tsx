import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";

import store from "../redux/store";

import Switch from "../components/functional/Switch";

import "../styles/app.css";
import "react-toastify/dist/ReactToastify.css";

import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { esES } from "@clerk/localizations";

const publicPages: Array<string> = ["/sign-in/[[...index]]"];

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();

  const isPublicPage = publicPages.includes(pathname);

  return (
    <ClerkProvider {...pageProps} localization={esES}>
      {isPublicPage ? (
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <Switch>
              <Component {...pageProps} />
            </Switch>
            <ToastContainer />
            <ReactQueryDevtools initialIsOpen={false} />
          </Provider>
        </QueryClientProvider>
      ) : (
        <>
          <SignedIn>
            <QueryClientProvider client={queryClient}>
              <Provider store={store}>
                <Switch>
                  <Component {...pageProps} />
                </Switch>
                <ToastContainer />
                <ReactQueryDevtools initialIsOpen={false} />
              </Provider>
            </QueryClientProvider>
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
