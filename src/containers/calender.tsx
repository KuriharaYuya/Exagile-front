import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Router from "next/router";
import { DatesSetArg } from "@fullcalendar/core";
import { requestAppoints } from "../redux/actions/appoints/appoints";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
const Calender: React.FC = () => {
  const state = useSelector((state: RootState) => state);
  const { appoints } = state.appointReducer;
  const handleRenderView = async (info: DatesSetArg) => {
    const { startStr, endStr } = info;
    await requestAppoints(startStr, endStr);
  };

  return (
    <>
      <FullCalendar
        initialView="dayGridMonth"
        plugins={[dayGridPlugin]}
        events={appoints}
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
