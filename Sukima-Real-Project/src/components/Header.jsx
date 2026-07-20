import "./Header.css";
import { useAuth } from "../context/AuthContext";

function Header() {

    const {user} = useAuth()

    const now = new Date();

    const time =
        now.getHours().toString().padStart(2,"0")
        + ":"
        + now.getMinutes().toString().padStart(2,"0");

    return (
        <header>

            <h2>Sukima Real</h2>

            <div className="header-right">

                <span>{time}</span>

                <img
                    src={user.photoURL}
                    alt=""
                    className="icon"
                />

            </div>

        </header>
    )

}

export default Header;