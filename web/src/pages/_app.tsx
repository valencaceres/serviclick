import type { AppProps } from "next/app";
import { Provider } from "react-redux";
//import { debounce } from "debounce";

//import { saveState } from "../utils/reduxPersist";
import store from "../redux/store";

import Layout from "../components/layout/Principal";

import "../styles/app.css";
// import "tailwindcss/tailwind.css";
// import "animate.css";

// store.subscribe(
//   debounce(() => {
//     saveState(store.getState());
//   }, 800)
// );

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
