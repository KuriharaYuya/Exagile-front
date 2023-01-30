import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  formatDateTimeLocal,
  formatTime,
  parseDateTimeLocal,
} from "../../utils/dateTime";
import { formatDate } from "@fullcalendar/core";
import React, { useEffect, useState } from "react";
import { requestAppointDetail } from "../../features/appoints/getDetail";
import {
  requestUpdateAppoint,
  updateStoreAppoint,
} from "../../features/appoints/updateDetail";
import Router from "next/router";
import { TextField } from "@mui/material";

import "react-markdown-editor-lite/lib/index.css";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import CharacterForm from "./characterTag";
import Faqs from "../faqs/faqs";
import Insights from "./insights";

const AppointDetail = ({ appointId }: { appointId: string }) => {
  const mdParser = new MarkdownIt();
  const [isDirty, setIsDirty] = useState(false);
  const appoint = useSelector(
    (state: RootState) => state.appointReducer.editing
  );
  // データをupdateするAPIを適切なタイミングのみで叩けるようにするためのstate
  const [onChanging, setOnChanging] = useState(false);

  useEffect(() => {
    (async () => {
      await requestAppointDetail(appointId);
    })();
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
    if (["start", "end"].includes(event.target.name)) {
      const updatedDate = parseDateTimeLocal(event.target.value);
      const updatedAppoint = {
        ...appoint,
        [event.target.name]: updatedDate,
      };
      updateStoreAppoint(updatedAppoint);
    } else {
      const updatedAppoint = {
        ...appoint,
        [event.target.name]: event.target.value,
      };
      updateStoreAppoint(updatedAppoint);
    }

    setOnChanging(true);
    setIsDirty(true);
  };
  const handleEditorChange = ({ text }: { text: string }) => {
    const updatedAppoint = {
      ...appoint,
      content: text,
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

  return (
    <>
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
        <TextField
          type="datetime-local"
          name="start"
          value={formatDateTimeLocal(appoint.start)}
          onChange={handleInputChange}
        />
        <TextField
          type="datetime-local"
          name="end"
          value={formatDateTimeLocal(appoint.end)}
          onChange={handleInputChange}
        />
      </div>
      <MdEditor
        onChange={handleEditorChange}
        value={appoint.content}
        renderHTML={(text) => mdParser.render(text)}
      />
      <CharacterForm />
      <br />
      <Faqs appointId={appointId} />
      <br />
      <Insights appointId={appointId} />
    </>
  );
};
export default AppointDetail;
