import { fetchLogin, fetchSignUp } from "../../apis/auth";
import { loginSuccess } from "../../redux/reducers/auth";
import store from "../../redux/store";
import { getAccessToken, signUpWithGoogle } from "../../utils/auth";
import { signUpWithEmail } from "../../utils/firebase/auth";

export const requestRegisterWithGoogle = async () => {
  // ここでuser登録
  const signUppedUser = await signUpWithGoogle();
  // ここから下でuserをログインさせてる
  await getAccessToken().then((token) => {
    fetchLogin(token);
  });
  store.dispatch(loginSuccess(signUppedUser));
};

type onSubmitProps = {
  email: string;
  password: string;
  username: string;
};

export const requestRegisterWithEmail = async (userData: onSubmitProps) => {
  const { email, password, username } = userData;
  const idToken = await signUpWithEmail(email, password);
  await fetchSignUp(idToken, username);
  // ログイン
  await fetchLogin(idToken);
  store.dispatch(loginSuccess(idToken));
};
