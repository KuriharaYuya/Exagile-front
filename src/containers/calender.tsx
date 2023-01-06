import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Router from "next/router";
import { DatesSetArg } from "@fullcalendar/core";
import { fetchAppoints } from "../apis/appoint";
import { appoints } from "../utils/type";
const Calender: React.FC = () => {
  const [testData, setTestData] = useState([{}]);

  const handleRenderView = async (info: DatesSetArg) => {
    const { startStr, endStr } = info;
    console.log(startStr, endStr);
    const data: appoints[] = await fetchAppoints(startStr, endStr).then(
      (res) => res.data
    );
    console.log(data);
    setTestData(data);
  };

  return (
    <>
      <FullCalendar
        initialView="dayGridMonth"
        plugins={[dayGridPlugin]}
        events={testData}
        eventClick={(eventInfo) => {
          const eventId = eventInfo.event._def.publicId;
          Router.push(`/appoints/${eventId}`);
        }}
        datesSet={handleRenderView}
      />
    </>
  );
};

export default Calender;
