import type { AppProps } from "next/app";
import { Provider } from "react-redux";

import store from "../redux/store";

import Switch from "../components/functional/Switch";

import "../styles/app.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Switch>
        <Component {...pageProps} />
      </Switch>
    </Provider>
  );
}

export default MyApp;
