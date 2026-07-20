import "./Home.css";

import Header from "../components/Header";
import BottomBar from "../components/BottomBar";
import PostCard from "../components/PostCard";

import usePosts from "../hooks/usePosts";

function Home(){

    const posts = usePosts();

    return(

        <>

            <Header/>

            <main>

                <div className="grid">

                    {
                        posts.map(post=>(

                            <PostCard
                                key={post.id}
                                post={post}
                            />

                        ))
                    }

                </div>

            </main>

            <BottomBar/>

        </>

    )

}

export default Home;