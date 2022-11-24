import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import log from "../../../config/logging";
import Card from "../../../components/Card";

function List() {
    const [posts, setPosts] = useState(null);

    useEffect(()=> {
        log.clear();
        axios.get("/blog/list")
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
            {posts && posts.map((post, i) =>{
                return(
                    <Card post={post} imgUrl={require("../../../media/MainPhoto.png")}/>
                )
            })}
        </div>
    )
}

export default List;