import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithPopup,
} from "firebase/auth";
import { provider } from "./init";
const auth = getAuth();

export const signUpWithGoogle = () => {
  // Googleでログイン
  signInWithPopup(auth, provider);
};

export const signUpWithEmail = async (email: string, password: string) => {
  const idToken = await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const idToken = user.getIdToken();
      return idToken;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  return idToken as string;
};
