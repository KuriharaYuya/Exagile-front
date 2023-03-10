import axios from "axios";
import { signup } from "../../config/urls";

export const fetchSignUp = async (uid: string, name: string) => {
  return await axios.post(signup, { user: { uid, name } }).then((res) => res);
};
