import React from "react";
import { useLogout } from "../hooks/useLogout";
import {Link} from "react-router-dom"

function Header() {
    const {logout} = useLogout();

    const handleClick = () => logout();
    return (
        <header id="Header">
            This is the Header
            <nav>
                <button onClick={handleClick}>Logout</button>
                <button><Link to="/login">Login</Link></button>
                <button><Link to="/signup">Signup</Link></button>
            </nav>
        </header>
    );
}

export default Header;