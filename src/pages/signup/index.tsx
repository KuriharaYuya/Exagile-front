// TODO: こいつは何？
export default function Signup() {
  return (
    <>
      <div>Signup</div>
      <button onClick={signUpWithGoogle}>サインアップ</button>
      <button onClick={checkCurrentUser}>ログイン確認</button>
    </>
  );
}
