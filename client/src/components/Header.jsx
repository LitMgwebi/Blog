import React from "react";
import { useLogout } from "../hooks/useLogout";
import { Link } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext";
import sun from "../icons/sun.svg";
import moon from "../icons/moon.svg";


function Header({ theme, imgIcon }) {
    const { logout } = useLogout();
    const { user } = useAuthContext();

    const handleClick = () => logout();
    return (
        <header id="Header">
            <div className="writing">
                <div>
                    <Link to="/">
                        <span>Blogger</span>
                    </Link>
                </div>
                <div className="headerButton">
                {imgIcon === "dark" ? <img src={sun} onClick={theme} className="headerLogo" alt="theme"/> 
                    : <img src={moon} onClick={theme} className="headerLogo" alt="theme"/>}
                </div>
            </div>
            <div>
                <nav>
                    {user && (
                        <div className="loggedIn">
                            <span>{user.email}</span>
                            <button onClick={handleClick}>Logout</button>
                        </div>
                    )}
                    {!user && (
                        <div className="loggedOUT">
                            <button><Link to="/login">Login</Link></button>
                            <button><Link to="/signup">Signup</Link></button>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
}

export default Header;