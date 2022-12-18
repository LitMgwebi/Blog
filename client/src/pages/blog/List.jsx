import { GetAllSecured } from "../../hooks/useAxiosGet";
import { Link } from "react-router-dom";
import PostCard from "../../components/PostCard";
import ProjectHeader from "../../components/ProjectHeader";

function List() {
    const { posts, isPending, error } = GetAllSecured();

    return (
        <div id="ContentContainer">
            <div className="section">
                {error && <div className="error">{error}</div>}
                {isPending && <div>Loading...</div>}
                <ProjectHeader header="Dashboard"/>
                <div className="button-group">
                    <button><Link to="/add">Add</Link></button>
                </div>
            </div>
            <div className="information">
                {posts && posts.map((post, i) => {
                    return (
                        <PostCard post={post} baseURL="/record/" />
                    );
                })}
            </div>
        </div>
    )
}

export default List;