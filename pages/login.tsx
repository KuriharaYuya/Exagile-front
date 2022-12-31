import { getAuth, signInWithPopup } from "firebase/auth";
import React from "react";
import { provider } from "../firebase/init";
const auth = getAuth();
export const Login = () => {
  const LoginWithGoogle = () => {
    // Googleでログイン
    signInWithPopup(auth, provider).then((result) => {
      console.log(result);
    });
  };
  return (
    <>
      <div>Login</div>
      <button onClick={LoginWithGoogle}>Googleでログイン</button>
    </>
  );
};

export default Login;
