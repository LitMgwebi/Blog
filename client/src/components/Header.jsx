import React from "react";
import { useLogout } from "../hooks/useLogout";
import { Link } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext"; 

function Header() {
    const {logout} = useLogout();
    const {user} = useAuthContext();

    const handleClick = () => logout();
    return (
        <header id="Header">
            This is the Header
            <nav>
                { user && (
                    <div>
                        <span>{user.email}</span>
                        <button onClick={handleClick}>Logout</button>
                    </div>
                )}
                {!user && (
                    <div>
                        <button><Link to="/login">Login</Link></button>
                        <button><Link to="/signup">Signup</Link></button>
                    </div>
                )}
            </nav>
        </header>
    );
}

export default Header;