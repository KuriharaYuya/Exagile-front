import React from "react";
import { useDispatch } from "react-redux";
import { fetchSessionCheck } from "../apis/auth";
import { requestLogin } from "../redux/actions/login";
import { requestRegister } from "../redux/actions/signup";
import { isLoggedIn } from "../utils/auth";

const Auth = () => {
  const dispatch = useDispatch();
  const handleRegister = () => {
    dispatch(requestRegister());
    // await signUpWithGoogle().then((res) => res.success);
  };

  const handleLogin = () => {
    dispatch(requestLogin());
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
