import Router from "next/router";
import React from "react";

const LoginButton = () => {
  const jumpLoginPageHandler = () => {
    Router.push("/login");
  };

  return <button onClick={jumpLoginPageHandler}>ログイン</button>;
};

export default LoginButton;
