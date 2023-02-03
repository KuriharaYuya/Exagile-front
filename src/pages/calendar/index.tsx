import Router from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchSessionCheck } from "../../apis/auth";
import LogoutButton from "../../components/auth/logoutButton";
import Calender from "../../components/calender";
import { requestLogout } from "../../features/auth/logout";
import { isLoggedIn } from "../../utils/auth";
import { homePath } from "../../utils/routes";

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      await fetchSessionCheck().then((data) => data.currentUser);
      const loggedIn = isLoggedIn();
      if (!loggedIn) {
        Router.push(homePath);
      }
    })();
  }, []);
  return (
    <>
      <h1>ホームです！</h1>
      <Calender />
      <button onClick={() => Router.push("/characters")}>
        キャラクターの一覧へ
      </button>
      <LogoutButton />
    </>
  );
}
