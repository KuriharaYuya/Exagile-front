import Router from "next/router";
import { useEffect } from "react";
import { isLoggedIn } from "../utils/auth";

export default function Home() {
  useEffect(() => {
    const loggedIn = isLoggedIn();
    if (!loggedIn) {
      Router.push("/signup");
    }
  }, []);
  return <h1>ホームです！</h1>;
}
