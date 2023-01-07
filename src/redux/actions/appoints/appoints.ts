import { fetchAppoints } from "../../../apis/appoint";
import { Appoint } from "../../../utils/type";
import { updateAppoints } from "../../reducers/appoints";
import store from "../../store";

export const requestAppoints = async (startStr: string, endStr: string) => {
  const appoints: Appoint[] = await fetchAppoints(startStr, endStr).then(
    (res) => res.data
  );
  store.dispatch(updateAppoints(appoints));
};
