import { fetchAppointDetail, fetchAppoints } from "../../../apis/appoint";
import { Appoint } from "../../../utils/type";
import { updateAppoints, updateEditingAppoint } from "../../reducers/appoints";
import store from "../../store";

export const requestAppoints = async (startStr: string, endStr: string) => {
  const appoints: Appoint[] = await fetchAppoints(startStr, endStr).then(
    (res) => res.data
  );
  store.dispatch(updateAppoints(appoints));
};

export const requestAppointDetail = async (id: string) => {
  const appoint = await fetchAppointDetail(id).then((res) => res.data);
  store.dispatch(updateEditingAppoint(appoint));
};
