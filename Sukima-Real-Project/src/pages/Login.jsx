import { signInWithPopup } from "firebase/auth";
import { auth, provider, db } from "../firebase/firebase";

import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  async function LoginGoogle() {
    try {
      const result = await signInWithPopup(auth, provider);

      const user = result.user;

      // users/{uid}
      const userRef = doc(db, "users", user.uid);

      const snap = await getDoc(userRef);

      // 初回ログインなら作成
      if (!snap.exists()) {
        await setDoc(userRef, {
          username: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          createdAt: serverTimestamp(),
        });
      }

      navigate("/home");
    } catch (err) {
      console.log(err);
      alert("ログインに失敗しました");
    }
  }

  return (
    <>
      <h1>Sukima Real</h1>

      <button onClick={LoginGoogle}>
        Googleでログイン
      </button>
    </>
  );
}

export default Login;