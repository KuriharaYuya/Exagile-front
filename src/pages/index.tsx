import Router from "next/router";
import { useEffect } from "react";
import { isLoggedIn, logout } from "../utils/auth";

export default function Home() {
  useEffect(() => {
    const loggedIn = isLoggedIn();
    if (!loggedIn) {
      Router.push("/signup");
    }
  }, []);
  const handleLogout = () => {
    logout();
    Router.push("/signup");
  };
  return (
    <>
      <h1>ホームです！</h1>
      <button onClick={handleLogout}>ログアウト</button>
    </>
  );
}
