import axios from "axios";
import { usersManipulateOpt } from "../config/urls";
import { UserManipulateOpts } from "../utils/type";

export const fetchUserManipulateOpts = async () => {
  return axios.get(usersManipulateOpt);
};

export const fetchUpdateUserManipulateOpts = async (
  updatedOpts: UserManipulateOpts
) => {
  return axios.put(usersManipulateOpt, { user: { options: updatedOpts } });
};
