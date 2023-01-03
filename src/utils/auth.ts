import { Auth, getAuth, signInWithPopup } from "firebase/auth";
import { fetchLogin, fetchSignUp } from "../pages/apis/signup";
import { provider } from "../pages/firebase/init";

const auth: Auth = getAuth() as Auth;

const getAccessToken = async () => {
  const idToken = await auth.currentUser!.getIdToken();
  return idToken;
};
export const signUpWithGoogle = async () => {
  // Googleでログイン
  await signInWithPopup(auth, provider);
  return getAccessToken().then(async (token) => {
    const accessToken: string = token;
    const res = await fetchSignUp(accessToken).then((res) => res);
    return { success: true, data: res.data };
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
