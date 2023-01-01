import { getAuth, signInWithPopup } from "firebase/auth";
import { fetchSignUp } from "../pages/apis/signup";
import { provider } from "../pages/firebase/init";
const auth = getAuth();

const signUpWithGoogle = () => {
  // Googleでログイン
  signInWithPopup(auth, provider).then((result) => {
    console.log(result);
  });
};

const checkCurrentUser = async () => {
  console.log(auth.currentUser, "ウエイ");
  await fetchSignUp("3h1b3h24g3f1", "aaayuyakurihara").then((res) =>
    console.log(res)
  );
};

export { signUpWithGoogle, checkCurrentUser };
