import React from 'react';
import {Link} from "react-router-dom";

const Home = () => {
    return(
        <div id="Home">
            <Link to="/list">List</Link>
            This is the Home
        </div>
    )
}

export  default Home;