import Router from "next/router";
import { useEffect } from "react";
import { isLoggedIn, logout } from "../utils/auth";

export default function Home() {
  useEffect(() => {
    const loggedIn = isLoggedIn();
    if (!loggedIn) {
      Router.push("/auth");
    }
  }, []);
  const handleLogout = () => {
    logout();
    Router.push("/auth");
  };
  return (
    <>
      <h1>ホームです！</h1>
      <button onClick={handleLogout}>ログアウト</button>
    </>
  );
}
