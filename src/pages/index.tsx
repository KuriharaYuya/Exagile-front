import Router from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchSessionCheck } from "../apis/auth";
import Calender from "../components/calender";
import { requestLogout } from "../redux/actions/auth/logout";
import { isLoggedIn } from "../utils/auth";

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      await fetchSessionCheck().then((data) => data.currentUser);
      const loggedIn = isLoggedIn();
      if (!loggedIn) {
        Router.push("/auth");
      }
    })();
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
