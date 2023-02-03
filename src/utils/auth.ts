import {
  Auth,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { fetchLogin, fetchLogout, fetchSignUp } from "../apis/auth";
import { provider } from "../libs/firebase/init";

const auth: Auth = getAuth() as Auth;

export const getAccessToken = async () => {
  const idToken = await auth.currentUser!.getIdToken();
  return idToken;
};
export const signUpWithGoogle = async () => {
  // サインアップ
  await signInWithPopup(auth, provider);
  // googleでsignupするとfirebaseとしてはログイン扱いになってるので、tokenを取得してserverに投げる
  return getAccessToken().then(async (token) => {
    const accessToken: string = token;
    const signUppedUser = await fetchSignUp(accessToken).then(
      (res) => res.data
    );
    return signUppedUser;
  });
};

export const signInWithGoogle = async () => {
  await signInWithPopup(auth, provider);
  return getAccessToken().then(async (token) => {
    return await fetchLogin(token);
  });
};

export const isLoggedIn = () => {
  return getCookie("isLoggedIn") === "true";
};
const getCookie = (name: string): string | undefined => {
  const value: string = "; " + document.cookie;
  const parts: string[] = value.split("; " + name + "=");
  if (parts.length == 2) {
    const result: string | undefined = parts.pop()?.split(";").shift();
    return result;
  }
  return undefined;
};

export const logout = () => {
  fetchLogout();
};

export const signInWithEmail = async (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const idToken = user.getIdToken();
      return idToken;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};
