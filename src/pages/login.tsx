import { getAuth, signInWithPopup } from "firebase/auth";
import React from "react";
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
  const checkCurrentUser = () => {
    console.log(auth.currentUser, "ウエイ");
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
