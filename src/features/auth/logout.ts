import { fetchLogout } from "../../apis/auth";
import { logoutSuccess } from "../../redux/reducers/auth";
import store from "../../redux/store";

export const requestLogout = async () => {
  await fetchLogout();
  store.dispatch(logoutSuccess());
};
