import axios from "axios";
import { signup } from "../urls";

export const fetchSignUp = async (uid: string, name: string) => {
  //TODO: このaxiosはインスタンス化して使いまわしたい https://github.com/axios/axios#creating-an-instance
  return await axios.post(signup, { user: { uid, name } }).then((res) => res);
};
