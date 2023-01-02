import axios from "axios";
import { signup } from "../urls";

export const fetchSignUp = async (accessToken: string) => {
  return await axios
    .post(signup, { user: { access_token: accessToken } })
    .then((res) => res);
};
