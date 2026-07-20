import { signInWithPopup } from "firebase/auth";
import { auth, provider, db } from "../firebase/firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

function Login() {

  const { user } = useAuth();

    useEffect(() => {
    if (user) {
        navigate("/home");
    }
    }, [user]);

  const navigate = useNavigate();

  async function GoogleLogin() {
    try {
      const result = await signInWithPopup(auth, provider);

      const user = result.user;

      const userRef = doc(db, "users", user.uid);

      const snap = await getDoc(userRef);

      if (!snap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          username: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          createdAt: serverTimestamp(),
        });
      }

      navigate("/home");
    } catch (error) {
      console.log(error);
      alert("ログインに失敗しました");
    }
  }

  return (
    <div>
      <h1>Sukima Real</h1>

      <button onClick={GoogleLogin}>
        Googleでログイン
      </button>
    </div>
  );
}

export default Login;