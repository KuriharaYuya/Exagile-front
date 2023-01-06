import axios from "axios";
import { calenderIndex } from "../config/urls";

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
