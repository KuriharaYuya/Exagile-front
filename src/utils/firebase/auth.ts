import { getAuth, signInWithPopup } from "firebase/auth";
import { fetchSignUp } from "./signup";
import { provider } from "./init";
const auth = getAuth();

export const signUpWithGoogle = () => {
  // Googleでログイン
  signInWithPopup(auth, provider);
};
