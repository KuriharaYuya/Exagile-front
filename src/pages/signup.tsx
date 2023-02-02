import React from "react";
import { useDispatch } from "react-redux";
import LoginButton from "../components/auth/loginButton";
import { requestRegister } from "../features/auth/signup";

const Signup = () => {
  const dispatch = useDispatch();
  const handleRegister = () => {
    dispatch(requestRegister());
  };
  return (
    <>
      <button onClick={handleRegister}>Googleでユーザー登録</button>
      <LoginButton />
    </>
  );
};

export default Signup;
