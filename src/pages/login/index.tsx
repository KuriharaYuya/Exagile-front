// TODO: こいつは何？
export default function Login() {
  return (
    <>
      <div>Login</div>
      <button onClick={signUpWithGoogle}>Googleでログイン</button>
      <button onClick={checkCurrentUser}>ログイン確認</button>
    </>
  );
}
