import Router from "next/router";
import { fetchLogin } from "../../apis/auth";
import { loginSuccess } from "../../redux/reducers/auth";
import store from "../../redux/store";
import { signInWithEmail, signInWithGoogle } from "../../utils/auth";
import { calendarPath } from "../../utils/routes";
interface User {
  user: {
    uid: string;
    name: string;
    created_at: string;
    updated_at: string;
    email: string;
  };
}

export const requestLoginWithGoogle = async () => {
  const current_user: User = await signInWithGoogle().then(
    (res) => res.data.user
  );
  store.dispatch(loginSuccess(current_user));
  Router.push(calendarPath);
};

export const requestLoginWithEmail = async (
  email: string,
  password: string
) => {
  // まずはfirebaseを使ってtokenを生成しよう
  const idToken = (await signInWithEmail(email, password)) as string;
  // API叩く
  const current_user: User = await fetchLogin(idToken).then(
    (res) => res.data.user
  );
  // サーバーからの返却の値をstoreへ投げる

  store.dispatch(loginSuccess(current_user));
  Router.push(calendarPath);
};
