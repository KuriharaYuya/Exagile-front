import axios from "axios";
import { login, logout, sessionCheck, signup } from "../urls";

export const fetchSignUp = async (accessToken: string) => {
  return await axios
    .post(signup, { user: { access_token: accessToken } })
    .then((res) => res);
};

export const fetchLogin = async (accessToken: string) => {
  return await axios
    .post(login, { session: { access_token: accessToken } })
    .then((res) => res);
};

export const fetchSessionCheck = async () => {
  return await axios.get(sessionCheck).then((res) => res.data);
};

export const fetchLogout = async () => {
  axios.delete(logout).then((res) => res);
};
