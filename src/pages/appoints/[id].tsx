import { GetServerSideProps } from "next";
import Router from "next/router";
import React from "react";
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

  return (
    <>
      <AppointDetailContainer appointId={appointId} />
      <button onClick={onClickHandler}>カレンダーに戻る</button>
    </>
  );
};

export default AppointDetail;
