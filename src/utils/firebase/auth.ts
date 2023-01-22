import { getAuth, signInWithPopup } from "firebase/auth";
import { fetchSignUp } from "./signup";
import { provider } from "./init";
const auth = getAuth();

export const signUpWithGoogle = () => {
  // Googleでログイン
  signInWithPopup(auth, provider).then((result) => {
    console.log(result);
  });
};

export const checkCurrentUser = async () => {
  console.log(auth.currentUser, "ウエイ");
  await fetchSignUp("3h1b3h24g3f1", "aaayuyakurihara").then((res) =>
    console.log(res)
  );
};

// TODO: exportは1つにまとめるよりも、分けた方がいいかも
