import React from "react";
import { useDispatch } from "react-redux";
import SignupButton from "../components/auth/signupButton";
import { requestLogin } from "../features/auth/login";
const Login = () => {
  const dispatch = useDispatch();
  const handleLogin = () => {
    dispatch(requestLogin());
  };
  return (
    <>
      <button onClick={handleLogin}>Googleでログイン</button>
      <SignupButton />
    </>
  );
};

export default Login;
