import "./PostCard.css";
import { useNavigate } from "react-router-dom";

function PostCard({post}){

    const navigate = useNavigate();

    return(

        <div
            className="card"
            onClick={()=>navigate(`/detail/${post.id}`)}
        >

            <img
                src={post.imageUrl}
                alt=""
            />

        </div>

    )

}

export default PostCard;