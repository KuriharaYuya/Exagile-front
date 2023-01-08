import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { formatTime } from "../utils/dateTime";
import { formatDate } from "@fullcalendar/core";
import React, { useEffect, useState } from "react";
import { requestAppointDetail } from "../redux/actions/appoints/getDetail";
import {
  requestUpdateAppoint,
  updateStoreAppoint,
} from "../redux/actions/appoints/updateDetail";
import Router from "next/router";

const AppointDetail = ({ appointId }: { appointId: string }) => {
  const [isDirty, setIsDirty] = useState(false);
  const appoint = useSelector(
    (state: RootState) => state.appointReducer.editing
  );
  // データをupdateするAPIを適切なタイミングのみで叩けるようにするためのstate
  const [onChanging, setOnChanging] = useState(false);

  useEffect(() => {
    requestAppointDetail(appointId);
    setOnChanging(false);
    const handleRouteChange = (url: string) => {
      requestUpdateAppoint();
    };

    Router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      Router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);

  // 入力値が変更されるたびに、updateAppointアクションを発行する
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (appoint === undefined) return;
    const updatedAppoint = {
      ...appoint,
      [event.target.name]: event.target.value,
    };
    updateStoreAppoint(updatedAppoint);
    setOnChanging(true);
    setIsDirty(true);
  };

  // 5秒後にupdateAppointアクションを発行する
  useEffect(() => {
    if (onChanging !== true) return;
    const timer = setTimeout(() => {
      requestUpdateAppoint();
      setOnChanging(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [appoint]);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      // APIがまだ叩かれていない場合は、確認メッセージを表示する
      if (isDirty) {
        event.preventDefault();
        requestUpdateAppoint();
        // リロード前に警告したければここをコメントイン
        // event.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isDirty]);

  const testPush = () => {
    Router.push("/");
  };
  return (
    <div>
      <button onClick={testPush}>テスト画面遷移</button>
      <h1>タイトル: {appoint.title}</h1>
      <h4>説明: {appoint.desc}</h4>
      <h4>日付: {formatDate(appoint.start)}</h4>
      <div>
        <h4>時間</h4>
        <p>
          {formatTime(appoint.start)}
          <span>~</span>
          {formatTime(appoint.end)}
        </p>
        <div>
          <h4>時間</h4>
          <p>
            {formatTime(appoint.start)}
            <span>~</span>
            {formatTime(appoint.end)}
          </p>
        </div>
        <input
          type="text"
          name="title"
          value={appoint.title}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="desc"
          value={appoint.desc}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="start"
          value={appoint.start}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="end"
          value={appoint.end}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};
export default AppointDetail;
