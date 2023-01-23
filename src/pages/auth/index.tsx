import { useDispatch } from "react-redux";
import { fetchSessionCheck } from "../../apis/auth";
import { requestLogin } from "../../features/auth/login";
import { requestRegister } from "../../features/auth/signup";

const Auth = () => {
  const dispatch = useDispatch();
  const handleRegister = () => {
    dispatch(requestRegister());
  };

  const handleLogin = () => {
    dispatch(requestLogin());
  };

  const handleCurrentUser = async () => {
    await fetchSessionCheck().then((data) => data.currentUser);
  };
  return (
    <>
      <div>ユーザー登録</div>
      <button onClick={handleRegister}>Googleでユーザー登録</button>
      <br />
      <div>ログイン</div>
      <button onClick={handleLogin}>Googleでログイン</button>
      <br />
      <button onClick={handleCurrentUser}>ログイン中のユーザー</button>
    </>
  );
};

export default Auth;
