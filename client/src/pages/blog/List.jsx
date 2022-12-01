import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import log from "../../config/logging";
import Card from "../../components/Card";
import {useAuthContext} from "../../hooks/useAuthContext";

function List() {
    const [posts, setPosts] = useState(null);
    const {user} = useAuthContext();
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(true);

    useEffect(()=> {
        // log.clear();
        log.info(user)

        if (user){
            axios({
                method: "GET",
                url: "http://localhost:4050/blog/list",
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            }).then((res) => {
                if(res.data.error != null){
                    log.error(res.data.error);
                    return;
                }
                setPosts(res.data.blog)
                setIsPending(false);
                setError(null);
                
            }).catch((error) => {
                log.error(error.message);
                setIsPending(false);
                setError(error.response.data.error);
            })
        }
        }, [user]);

    return (
        <div className="contentContainer">
            {error && <div className="error">{error}</div>}
            {isPending && <div>Loading...</div>}
            <h1>Dashboard</h1>
            <Link to="/add">Add</Link>
            {posts && posts.map((post, i) =>{
                return(
                    <Card post={post}/>
                )
            })}
        </div>
    )
}

export default List;