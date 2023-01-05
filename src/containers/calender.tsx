import React from "react";
import { useSelector } from "react-redux";

const Calender: React.FC = () => {
  const state = useSelector((state) => state);
  console.log(state);
  return <h1>yes</h1>;
};

export default Calender;
