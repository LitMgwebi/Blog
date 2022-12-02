import { GetAllSecured } from "../../hooks/useAxiosGet";
import { Link } from "react-router-dom";
import PostCard from "../../components/PostCard";

function List() {
    const { posts, isPending, error } = GetAllSecured();

    return (
        <div id="ContentContainer">
            {error && <div className="error">{error}</div>}
            {isPending && <div>Loading...</div>}
            <h1>Dashboard</h1>
            <Link to="/add">Add</Link>
            {posts && posts.map((post, i) => {
                return (
                    <PostCard post={post} baseURL="/record/" />
                )
            })}
        </div>
    )
}

export default List;