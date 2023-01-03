import Router from "next/router";
import React, { useEffect, useState } from "react";
import { fetchSessionCheck } from "../apis/auth";
import { isLoggedIn, signInWithGoogle, signUpWithGoogle } from "../utils/auth";

const Auth = () => {
  const handleRegister = async () => {
    await signUpWithGoogle().then((res) => res.success);
    if (isLoggedIn()) Router.push("/");
  };

  const handleLogin = async () => {
    await signInWithGoogle();
    Router.push("/");
  };

  const handleCurrentUser = async () => {
    console.log(isLoggedIn(), "is logged in?");
    console.log(await fetchSessionCheck().then((data) => data.currentUser));
  };
  return (
    <>
      <div>ユーザー登録</div>
      <button onClick={handleRegister}>Googleでユーザー登録</button>
      <br />
      <div>ログイン</div>
      <button onClick={handleLogin}>Googleでログイン</button>
      <br />
      <button onClick={handleCurrentUser}>ログイン中のユーザー</button>
    </>
  );
};

export default Auth;
