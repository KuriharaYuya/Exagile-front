import Router from "next/router";
import React, { useEffect } from "react";
import { fetchSessionCheck } from "../apis/auth";
import LoginButton from "../components/auth/loginButton";
import SignupButton from "../components/auth/signupButton";
import { isLoggedIn } from "../utils/auth";
import { calendarPath, homePath } from "../utils/routes";

const Home = () => {
  useEffect(() => {
    (async () => {
      await fetchSessionCheck().then((data) => data.currentUser);
      const loggedIn = isLoggedIn();
      if (!loggedIn) {
        Router.push(homePath);
      } else {
        Router.push(calendarPath);
      }
    })();
  }, []);
  return (
    <>
      <div>ホームだぜ</div>
      <LoginButton />
      <SignupButton />
    </>
  );
};

export default Home;
