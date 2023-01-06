import Router from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Calender from "../containers/calender";
import { requestLogout } from "../redux/actions/auth/logout";
import { isLoggedIn, logout } from "../utils/auth";

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    const loggedIn = isLoggedIn();
    if (!loggedIn) {
      Router.push("/auth");
    }
  }, []);
  const handleLogout = () => {
    dispatch(requestLogout());
    Router.push("/auth");
  };
  return (
    <>
      <h1>ホームです！</h1>
      <Calender />
      <button onClick={handleLogout}>ログアウト</button>
    </>
  );
}
