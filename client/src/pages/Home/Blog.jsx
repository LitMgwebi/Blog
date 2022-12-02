import { useLocation } from "react-router";
import PostOutput from "../../components/PostOutput";
import { GetOne } from "../../hooks/useAxiosGet";

function Blog() {
    const location = useLocation();
    const id = location.state.stateId;

    const { post, isPending, error } = GetOne(id);
    return (
        <div id="ContentContainer">
            {error && <div className="error">{error}</div>}
            {isPending && <div>Loading...</div>}
            {post && <PostOutput post={post} title="Blog" />}
        </div>
    )
}

export default Blog;