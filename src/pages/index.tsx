import Router from "next/router";
import React from "react";
import LoginButton from "../components/auth/loginButton";
import SignupButton from "../components/auth/signupButton";

const Home = () => {
  return (
    <>
      <div>ホームだぜ</div>
      <LoginButton />
      <SignupButton />
    </>
  );
};

export default Home;
