import { useRef, useState } from "react";
import { storage, db, auth } from "../firebase/firebase";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

import { getFunctions, httpsCallable } from "firebase/functions";

const functions = getFunctions();
const scoreImage = httpsCallable(functions, "scoreImage");

function Photo() {
  const inputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const openCamera = () => {
    inputRef.current.click();
  };

  const handleImage = (e) => {
    const image = e.target.files[0];

    if (!image) return;

    setFile(image);
    setPreview(URL.createObjectURL(image));
  };

  const uploadImage = async () => {
    if (!file) return;

    try {
      setLoading(true);

      const uid = auth.currentUser.uid;
      const postId = crypto.randomUUID();

      // ==========================
      // Storageへアップロード
      // ==========================
      const imageRef = ref(storage, `images/${uid}/${postId}`);

      await uploadBytes(imageRef, file);

      const imageUrl = await getDownloadURL(imageRef);

      // ==========================
      // Gemini判定
      // ==========================
      const base64 = await fileToBase64(file);

      const result = await scoreImage({
        image: base64,
      });

      const score = result.data.score;
      const reason = result.data.reason;

      // ==========================
      // Firestore保存
      // ==========================
      await setDoc(doc(db, "posts", postId), {
        postId,
        uid,
        imageUrl,
        score,
        reason,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      alert(`Sukima度 ${score}点\n${reason}`);

      setFile(null);
      setPreview("");

    } catch (err) {
      console.error(err);
      alert("アップロードに失敗しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={openCamera}
        disabled={loading}
      >
        カメラ起動
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        hidden
        onChange={handleImage}
      />

      {preview && (
        <>
          <img
            src={preview}
            alt="preview"
            width="300"
          />

          <br />

          <button
            onClick={uploadImage}
            disabled={loading}
          >
            {loading ? "判定中..." : "投稿する"}
          </button>
        </>
      )}
    </>
  );
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result.split(",")[1]);
    };

    reader.onerror = reject;

    reader.readAsDataURL(file);
  });
}

export default Photo;