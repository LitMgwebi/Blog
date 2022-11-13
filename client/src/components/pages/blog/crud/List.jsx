import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import log from "../../../../config/logging";

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
        <div className="listPage">
            <h1>Blogs</h1>
            <Link to="/add">Add</Link>
            {posts.map((post, i) =>{
                return(
                    <div className="post" key={post._id}>
                        <h3>{post.title}</h3>
                        <h5>{post.author}</h5>
                        <p>{post.tagline}</p>
                        <Link
                            to={`/record/${post._id}`}
                            state={{stateId: post._id}}
                        >
                            <button >View</button>
                        </Link>
                    </div>
                )
            })}
        </div>
    )
}

export default List;