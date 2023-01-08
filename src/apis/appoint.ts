import axios from "axios";
import { appointDetail, calenderIndex } from "../config/urls";
import { Appoint } from "../utils/type";

export const fetchAppoints = async (startStr: string, endStr: string) => {
  return await axios
    .get(calenderIndex, {
      params: {
        start: startStr,
        end: endStr,
      },
    })
    .then((res) => res);
};

export const fetchAppointDetail = async (id: string) => {
  return await axios
    .get(appointDetail(id), { params: { appoints: { id } } })
    .then((res) => res);
};
export const updateAppointDetail = async (id: string, appoint: Appoint) => {
  return await axios
    .patch(appointDetail(id), {
      appoints: appoint,
    })
    .then((res) => res);
};
