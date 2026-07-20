import "./BottomBar.css";
import { useNavigate } from "react-router-dom";

function BottomBar(){

    const navigate = useNavigate();

    return(

        <nav>

            <button onClick={()=>navigate("/photo")}>
                PHOTO
            </button>

            <button onClick={()=>navigate("/schedule")}>
                SCHEDULE
            </button>

            <button onClick={()=>navigate("/home")}>
                POSTS
            </button>

        </nav>

    )

}

export default BottomBar;