import { GetServerSideProps } from "next";
import Router from "next/router";
import React from "react";
import { fetchAppointDelete } from "../../apis/appoint";
import Appoint from "../../components/appoints/appointDetail";
import { calendarPath } from "../../utils/routes";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const appointId: string = context.params!.id as string;

  return {
    props: {
      appointId,
    },
  };
};

const AppointDetail = ({ appointId }: { appointId: string }) => {
  const onBackCalenderHandler = () => {
    Router.push(calendarPath);
  };

  const onDeleteHandler = () => {
    fetchAppointDelete(appointId);
    Router.push(calendarPath);
  };

  return (
    <>
      <div style={{ background: "blue" }}>
        <Appoint appointId={appointId} />
      </div>
      <button onClick={onBackCalenderHandler}>カレンダーに戻る</button>
      <button onClick={onDeleteHandler}>削除します</button>
    </>
  );
};

export default AppointDetail;
