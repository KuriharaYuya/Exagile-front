import { logout } from "../../../utils/auth";
import { logoutSuccess } from "../../reducers/auth";
import store from "../../store";

export const requestLogout = () => {
  logout();
  store.dispatch(logoutSuccess());
  return {
    type: logoutSuccess.type,
  };
};
