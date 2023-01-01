import React from "react";
import { checkCurrentUser, signUpWithGoogle } from "../utils/auth";

const Auth = () => {
  return (
    <>
      <div>Login</div>
      <button onClick={signUpWithGoogle}>Googleでログイン</button>
      <button onClick={checkCurrentUser}>ログイン確認</button>
    </>
  );
};

export default Auth;
