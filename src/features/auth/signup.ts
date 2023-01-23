import Router from "next/router";
import { fetchLogin } from "../../apis/auth";
import { loginSuccess } from "../../redux/reducers/auth";
import store from "../../redux/store";
import { getAccessToken, signUpWithGoogle } from "../../utils/auth";

// actionをこのように扱うのは違うかな。redux-toolkitのDocを読もう https://redux-toolkit.js.org/tutorials/typescript#define-slice-state-and-action-types
export const requestRegister = () => {
  const setSignup = async () => {
    const signUppedUser = await signUpWithGoogle();
    getAccessToken().then((token) => {
      fetchLogin(token);
    });
    store.dispatch(loginSuccess(signUppedUser));
    Router.push("/");
  };
  setSignup();
  return {
    type: loginSuccess.type,
  };
};
