import { fetchAppoints } from "../../apis/appoint";
import { Appoint } from "../../utils/type";
import { updateAppoints } from "../../redux/reducers/appoints";
import store from "../../redux/store";

export const requestAppoints = async (startStr: string, endStr: string) => {
  const appoints: Appoint[] = await fetchAppoints(startStr, endStr).then(
    (res) => res.data
  );
  store.dispatch(updateAppoints(appoints));
};
