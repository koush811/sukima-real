import { useRef, useState } from "react";
import { storage, db, auth } from "../firebase/firebase";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

function Photo() {
  const inputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");

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
      const uid = auth.currentUser.uid;
      const postId = crypto.randomUUID();

      // Storage
      const imageRef = ref(storage, `images/${uid}/${postId}`);

      await uploadBytes(imageRef, file);

      const imageUrl = await getDownloadURL(imageRef);

      // Firestore
      await setDoc(doc(db, "posts", postId), {
        postId,
        uid,
        imageUrl,
        score: 0,
        reason: "",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      alert("投稿しました");

    } catch (err) {
      console.log(err);
      alert("アップロード失敗");
    };
  };

  return (
    <>
      <button onClick={openCamera}>
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
            width="300"
          />

          <br />

          <button onClick={uploadImage}>
            投稿する
          </button>
        </>
      )}
    </>
  );
}

export default Photo;