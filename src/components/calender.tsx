import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Calendar: React.FC = () => {
  const loginState = useSelector((state: RootState) => state.login);

  return <div>{loginState && <Calendar />}</div>;
};

export default Calendar;
