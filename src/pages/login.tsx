import { getAuth, signInWithPopup } from "firebase/auth";
import React from "react";
import { fetchSignUp } from "./apis/signup";
import { provider } from "./firebase/init";
const auth = getAuth();
export const Login = () => {
  console.log(auth.currentUser);
  const LoginWithGoogle = () => {
    // Googleでログイン
    signInWithPopup(auth, provider).then((result) => {
      console.log(result);
    });
  };
  const checkCurrentUser = async () => {
    console.log(auth.currentUser, "ウエイ");
    await fetchSignUp("3h1b3h24g3f1", "aaayuyakurihara").then((res) =>
      console.log(res)
    );
  };
  return (
    <>
      <div>Login</div>
      <button onClick={LoginWithGoogle}>Googleでログイン</button>
      <button onClick={checkCurrentUser}>ログイン確認</button>
    </>
  );
};

export default Login;
