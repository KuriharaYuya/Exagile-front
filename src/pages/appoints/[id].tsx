import { GetServerSideProps } from "next";
import Router from "next/router";
import React from "react";
import { fetchAppointDelete } from "../../apis/appoint";
import AppointDetailContainer from "../../containers/appointDetail";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const appointId: string = context.params!.id as string;

  return {
    props: {
      appointId,
    },
  };
};

const AppointDetail = ({ appointId }: { appointId: string }) => {
  const onClickHandler = () => {
    Router.push("/");
  };

  const onDeleteHandler = () => {
    fetchAppointDelete(appointId);
    Router.push("/");
  };

  return (
    <>
      <AppointDetailContainer appointId={appointId} />
      <button onClick={onClickHandler}>カレンダーに戻る</button>
      <button onClick={onDeleteHandler}>削除します</button>
    </>
  );
};

export default AppointDetail;
