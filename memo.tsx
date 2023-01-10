import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { formatTime } from "../utils/dateTime";
import { formatDate } from "@fullcalendar/core";
import { useEffect } from "react";
import { updateAppoint } from "../apis/appoint";

const AppointDetail = ({ appointId }) => {
  const dispatch = useDispatch();
  const appoint = useSelector(
    (state: RootState) => state.appointReducer.editing
  );

  // 入力値が変更されるたびに、updateAppointアクションを発行する
  const handleInputChange = (event) => {
    const updatedAppoint = {
      ...appoint,
      [event.target.name]: event.target.value,
    };
    updateAppoint(updatedAppoint);
  };

  // 5秒後にupdateAppointアクションを発行する
  useEffect(() => {
    const timer = setTimeout(() => {
      updateAppoint(appoint);
    }, 5000);
    return () => clearTimeout(timer);
  }, [appoint]);

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
