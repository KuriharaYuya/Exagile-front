import React from "react";
import { useDispatch } from "react-redux";
import { fetchSessionCheck } from "../apis/auth";
import { requestLogin } from "../redux/actions/auth/login";
import { requestRegister } from "../redux/actions/auth/signup";
import { isLoggedIn } from "../utils/auth"; //TODO: 使ってない関数はimportを削除すること！

//TODO: これ直接pages/auth/index.tsxに書いてもいいかも
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
    await fetchSessionCheck().then((data) => data.currentUser);
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
