import { Auth, getAuth, signInWithPopup } from "firebase/auth";
import { fetchSignUp } from "../pages/apis/signup";
import { provider } from "../pages/firebase/init";

const auth: Auth = getAuth() as Auth;

const getAccessToken = async () => {
  const idToken = await auth.currentUser!.getIdToken();
  return idToken;
};
const signUpWithGoogle = async () => {
  // Googleでログイン
  await signInWithPopup(auth, provider);
  return getAccessToken().then(async (token) => {
    const accessToken: string = token;
    const res = await fetchSignUp(accessToken).then((res) => res);
    return { success: true, data: res.data };
  });
};

export { signUpWithGoogle };
