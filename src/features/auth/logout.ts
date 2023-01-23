import { logoutSuccess } from "../../redux/reducers/auth";
import store from "../../redux/store";
import { logout } from "../../utils/auth";

export const requestLogout = () => {
  logout();
  store.dispatch(logoutSuccess());
  return {
    type: logoutSuccess.type,
  };
};
