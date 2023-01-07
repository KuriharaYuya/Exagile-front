import Router from "next/router";
import { fetchLogin } from "../../../apis/auth";
import { getAccessToken, signUpWithGoogle } from "../../../utils/auth";
import { loginSuccess } from "../../reducers/auth";
import store from "../../store";

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