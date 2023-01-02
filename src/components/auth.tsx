import React, { useState } from "react";
import { signUpWithGoogle } from "../utils/auth";
const Auth = () => {
  const [success, setSuccess] = useState(false);
  const handleRegister = async () => {
    const success = await signUpWithGoogle().then((res) => res.success);
    setSuccess(success);
  };
  return (
    <>
      <div>ユーザー登録</div>
      <button onClick={handleRegister}>Googleでユーザー登録</button>
      {success === true && <div>ログイン成功!</div>}
    </>
  );
};

export default Auth;
