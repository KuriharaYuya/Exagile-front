import Router from "next/router";
import React from "react";

const SignupButton = () => {
  const jumpSignUpPageHandler = () => {
    Router.push("/signup");
  };
  return <button onClick={jumpSignUpPageHandler}>登録</button>;
};

export default SignupButton;
