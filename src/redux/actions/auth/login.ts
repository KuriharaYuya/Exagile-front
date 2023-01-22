import Router from "next/router";
import { signInWithGoogle } from "../../../utils/auth";
import { loginSuccess } from "../../reducers/auth";
import store from "../../store";
interface User {
  user: {
    uid: string;
    name: string;
    created_at: string;
    updated_at: string;
    email: string;
  };
}

export const requestLogin = () => {
  fetchCurrentUser();
  return {
    type: loginSuccess.type,
  };
};

const fetchCurrentUser = async () => {
  const current_user: User = await signInWithGoogle().then(
    (res) => res.data.user
  );
  store.dispatch(loginSuccess(current_user));
  Router.push("/");
};
