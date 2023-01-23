import { fetchAppointDetail } from "../../apis/appoint";
import { updateEditingAppoint } from "../../redux/reducers/appoints";
import store from "../../redux/store";

export const requestAppointDetail = async (id: string) => {
  const appoint = await fetchAppointDetail(id).then((res) => res.data);
  store.dispatch(updateEditingAppoint(appoint));
};
