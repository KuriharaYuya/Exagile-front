import { GetServerSideProps } from "next";
import Router from "next/router";
import React from "react";
import { fetchAppointDelete } from "../../apis/appoint";
import AppointDetailContainer from "../../components/appoints/appointDetail";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const appointId: string = context.params!.id as string;

  return {
    props: {
      appointId,
    },
  };
};

const AppointDetail = ({ appointId }: { appointId: string }) => {
  // TODO: onClickを使っているものが２つあるので、このonClickHandlerはonBackCalenderHandlerとかにしたほうがいいかな。
  const onBackCalenderHandler = () => {
    Router.push("/");
  };

  // TODO: 良き
  const onDeleteHandler = () => {
    fetchAppointDelete(appointId);
    Router.push("/");
  };

  return (
    <>
      <div style={{ background: "blue" }}>
        {
          // TODO: inlineのcssは使わないほうがいいかな。
        }
        <AppointDetailContainer appointId={appointId} />
        {
          // TODO: Containerってつける必要ないかな。。あと、Containerじゃなくて、フォルダ名Componentsにするほうがいいかな。
        }
      </div>
      <button onClick={onBackCalenderHandler}>カレンダーに戻る</button>
      <button onClick={onDeleteHandler}>削除します</button>
    </>
  );
};

export default AppointDetail;
