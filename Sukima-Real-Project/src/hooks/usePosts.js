import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/firebase";

function usePosts(){

    const [posts,setPosts] = useState([]);

    useEffect(()=>{

        const q = query(
            collection(db,"posts"),
            orderBy("createdAt","desc")
        );

        const unsubscribe = onSnapshot(q,(snapshot)=>{

            const data = snapshot.docs.map(doc=>({

                id:doc.id,
                ...doc.data()

            }));

            setPosts(data);

        });

        return unsubscribe;

    },[]);

    return posts;

}

export default usePosts;