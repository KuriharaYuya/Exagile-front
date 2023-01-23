import { updateAppointDetail } from "../../apis/appoint";
import { Appoint } from "../../utils/type";
import { updateEditingAppoint } from "../../redux/reducers/appoints";
import store from "../../redux/store";

export const requestUpdateAppoint = async () => {
  const state = store.getState().appointReducer;
  const tgtAppoint = state.editing;
  const appoint = await updateAppointDetail(tgtAppoint.id, tgtAppoint).then(
    (res) => res.data
  );
  store.dispatch(updateEditingAppoint(appoint));
};

export const updateStoreAppoint = (appoint: Appoint) => {
  store.dispatch(updateEditingAppoint(appoint));
};
