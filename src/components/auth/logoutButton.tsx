import Router from "next/router";
import React from "react";
import { useDispatch } from "react-redux";
import { requestLogout } from "../../features/auth/logout";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(requestLogout());
    Router.push("/");
  };
  return <button onClick={handleLogout}>ログアウト</button>;
};

export default LogoutButton;
