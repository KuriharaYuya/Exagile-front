import moment from "moment";

export const formatDate = (date: string) => {
  return moment(date).format("YYYY年M月D日(ddd)");
};

export const formatTime = (time: string) => {
  return moment(time).format("H時mm分");
};

export const formatDateTimeLocal = (dateTime: string): string => {
  const date = new Date(dateTime);
  const year = date.getFullYear();
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const day = `0${date.getDate()}`.slice(-2);
  const hours = `0${date.getHours()}`.slice(-2);
  const minutes = `0${date.getMinutes()}`.slice(-2);
  const formatted = `${year}-${month}-${day}T${hours}:${minutes}`;
  return formatted;
};

export const parseDateTimeLocal = (dateTime: string): string => {
  const date = new Date(dateTime);
  const year = date.getFullYear();
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const day = `0${date.getDate()}`.slice(-2);
  const hours = `0${date.getHours()}`.slice(-2);
  const minutes = `0${date.getMinutes()}`.slice(-2);
  const formatted = `${year}-${month}-${day}T${hours}:${minutes}`;
  return formatted;
};
