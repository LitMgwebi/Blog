import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import log from "../../../../config/logging";
import Card from "../../../layout/Card";

function List() {
    const [posts, setPosts] = useState([]);

    useEffect(()=> {
        log.clear();
        axios.get("http://localhost:2550/list")
            .then((res) => {
                setPosts(res.data.blog)
                if(res.data.error != null){
                    log.error(res.data.error);
                }
            }).catch((err) => {
                log.error(err.message);
            })
    }, []);

    return (
        <div className="contentContainer">
            <h1>Blogs</h1>
            <Link to="/add">Add</Link>
            {posts.map((post, i) =>{
                return(
                    <Card post={post} imgUrl={require("../../../../media/MainPhoto.png")}/>
                )
            })}
        </div>
    )
}

export default List;