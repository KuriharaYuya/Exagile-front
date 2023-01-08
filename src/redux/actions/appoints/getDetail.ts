import { fetchAppointDetail } from "../../../apis/appoint";
import { updateEditingAppoint } from "../../reducers/appoints";
import store from "../../store";

export const requestAppointDetail = async (id: string) => {
  const appoint = await fetchAppointDetail(id).then((res) => res.data);
  store.dispatch(updateEditingAppoint(appoint));
};
