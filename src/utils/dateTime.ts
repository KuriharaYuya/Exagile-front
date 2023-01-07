import moment from "moment";

export const formatDate = (date: string) => {
  return moment(date).format("YYYY年M月D日(ddd)");
};

export const formatTime = (time: string) => {
  return moment(time).format("H時mm分");
};
