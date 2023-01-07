import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { requestAppointDetail } from "../redux/actions/appoints/appoints";
import { RootState } from "../redux/store";
import { formatDate, formatTime } from "../utils/dateTime";
import { Appoint } from "../utils/type";

type Props = {
  appointId: string;
};

const AppointDetail = ({ appointId }: Props) => {
  const state = useSelector((state: RootState) => state);
  const appoint: Appoint = state.appointReducer.editing;
  useEffect(() => {
    requestAppointDetail(appointId);
  }, []);
  return (
    <div>
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
      </div>
    </div>
  );
};

export default AppointDetail;
