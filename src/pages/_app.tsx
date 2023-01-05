import "../../styles/globals.css";
import type { AppProps } from "next/app";
import axios from "axios";
import { Provider } from "react-redux";
import store from "../redux/store";

// 全てのリクエストの中にクッキーを含める
axios.defaults.withCredentials = true;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
