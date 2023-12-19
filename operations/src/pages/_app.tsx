import { useEffect } from "react";
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
import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js;`;
import Switch from "../components/functional/Switch";

import "../styles/app.css";
import "react-toastify/dist/ReactToastify.css";

import type { AppProps } from "next/app";
import { esES } from "@clerk/localizations";
import { Toaster } from "~/components/ui/Toaster";

import { useRetail } from "../store/hooks";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const { setRetailDataLoading } = useRetail();

  return (
    <ClerkProvider {...pageProps} localization={esES}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <Switch>
            <Component {...pageProps} />
            <Toaster />
          </Switch>
          <ToastContainer />
          <ReactQueryDevtools initialIsOpen={false} />
        </Provider>
      </QueryClientProvider>
    </ClerkProvider>
  );
}

export default MyApp;
