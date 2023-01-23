import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import Router from "next/router";
import { DatesSetArg } from "@fullcalendar/core";
import { requestAppoints } from "../features/appoints/appointsIndex";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Button, Modal, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import moment from "moment";
import { fetchNewAppoint } from "../apis/appoint";
import { Appoint } from "../utils/type";

const Calender: React.FC = () => {
  const state = useSelector((state: RootState) => state);
  const { appoints } = state.appointReducer;
  const handleRenderView = async (info: DatesSetArg) => {
    const { startStr, endStr } = info;
    await requestAppoints(startStr, endStr);
  };

  const [initialDates, setInitialDates] = useState({ start: "", end: "" });

  const [open, setOpen] = useState(false);

  const handleOpen = (data: DateClickArg) => {
    const initialStart = moment(data.date)
      .add(10, "h")
      .tz("Asia/tokyo")
      .format("YYYY-MM-DDThh:mm:ss");
    const initialEnd = moment(data.date)
      .add(12, "h")
      .tz("Asia/tokyo")
      .format("YYYY-MM-DDThh:mm:ss");
    setInitialDates({ start: initialStart, end: initialEnd });
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (formData: any) => {
    // ここで、APIを叩くための関数を呼び出す
    const appoint: Appoint = await fetchNewAppoint(formData).then(
      (res) => res.data
    );
    handleClose();
    reset();
    Router.push(`appoints/${appoint.id}`);
  };

  return (
    <>
      <FullCalendar
        initialView="dayGridMonth"
        plugins={[dayGridPlugin, interactionPlugin]}
        events={appoints}
        eventClick={(eventInfo) => {
          const eventId = eventInfo.event._def.publicId;
          Router.push(`/appoints/${eventId}`);
        }}
        datesSet={handleRenderView}
        dateClick={handleOpen}
      />
      <Modal
        open={open}
        onClose={handleClose}
        style={{
          width: "500px",
          height: "400px",
          backgroundColor: "white",
          padding: "45px",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField label="Title" {...register("title", { required: true })} />
          <TextField
            label="Description"
            {...register("desc", { required: true })}
          />
          <TextField
            label="Start"
            type="datetime-local"
            {...register("start", { required: true })}
            defaultValue={initialDates.start}
          />
          <TextField
            label="End"
            type="datetime-local"
            {...register("end", { required: true })}
            defaultValue={initialDates.end}
          />
          <Button type="submit">Submit</Button>
          <Button onClick={handleClose}>Close</Button>
        </form>
      </Modal>
    </>
  );
};

export default Calender;
