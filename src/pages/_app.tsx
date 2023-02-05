import "../../styles/globals.css";
import type { AppProps } from "next/app";
import axios from "axios";
import moment from "moment-timezone";
import { Provider } from "react-redux";
import reduxStore, { persistor } from "../redux/store";
import Header from "../components/common/header";
import { PersistGate } from "redux-persist/integration/react";
import { useRouter } from "next/router";
import { homePath, loginPath, signupPath } from "../utils/routes";

// 全てのリクエストの中にクッキーを含める
axios.defaults.withCredentials = true;

// タイムゾーンを日本に設定
moment.tz.setDefault("Asia/Tokyo");

export default function App({ Component, pageProps }: AppProps) {
  const { currentUser, isLoggedIn } = reduxStore.getState().authReducer;
  const router = useRouter();
  const whiteList = [homePath, loginPath, signupPath];
  // whiteList以外のパスへのゲストのアクセスを禁止
  if (
    typeof window !== "undefined" &&
    !isLoggedIn &&
    !whiteList.includes(router.pathname)
  ) {
    router.push("/");
  }
  return (
    <Provider store={reduxStore}>
      <PersistGate persistor={persistor}>
        <Header isLoggedIn={isLoggedIn} />
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}
