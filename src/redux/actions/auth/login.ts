import Router from "next/router";
import { signInWithGoogle } from "../../../utils/auth";
import { loginSuccess } from "../../reducers/auth";
import store from "../../store";

export const requestLogin = () => {
  interface user {
    user: {
      uid: string;
      name: string;
      created_at: string;
      updated_at: string;
      email: string;
    };
  }

  const fetchCurrentUser = async () => {
    const current_user: user = await signInWithGoogle().then(
      (res) => res.data.user
    );
    store.dispatch(loginSuccess(current_user));
    Router.push("/");
  };

  fetchCurrentUser();
  return {
    type: loginSuccess.type,
  };
};
