import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import testApo from "../../testApo.json";
import Router from "next/router";

const Calender: React.FC = () => {
  const [testData, setTestData] = useState(testApo);
  const testDataToAdd = {
    id: "afvsadc",
    title: "ダミー予定 advsnajsndfvsdaf",
    start: "2022-12-29T00:00:00",
    end: "2022-12-29T10:00:00",
  };

  // イベントを追加するための関数
  const addEvent = () => {
    setTestData((prev) => [...prev, testDataToAdd]);
    console.log(testData);
  };

  return (
    <>
      <button onClick={addEvent}>Add Event</button>

      <FullCalendar
        initialView="dayGridMonth"
        plugins={[dayGridPlugin]}
        events={testData}
        eventClick={(eventInfo) => {
          const eventId = eventInfo.event._def.publicId;
          Router.push(`/appoints/${eventId}`);
        }}
      />
    </>
  );
};

export default Calender;
