import Router from "next/router";

import LogoutButton from "../../components/auth/logoutButton";
import Calender from "../../components/calender";

export default function Home() {
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
