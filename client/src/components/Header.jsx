import React from "react";
import { useLogout } from "../hooks/useLogout";
import { Link } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext";

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
                    {imgIcon === "dark" ? <p onClick={theme}>Sun</p>
                        : <p onClick={theme}>Night</p>}
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