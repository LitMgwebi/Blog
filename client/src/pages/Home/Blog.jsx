import { useLocation } from "react-router";
import PostOutput from "../../components/PostOutput";
import ProjectHeader from "../../components/ProjectHeader";
import { GetOne } from "../../hooks/useAxiosGet";
import { Link } from "react-router-dom";

function Blog() {
    const location = useLocation();
    const id = location.state.stateId;

    const { post, isPending, error } = GetOne(id);
    return (
        <div id="ContentContainer">
            <div className="section">
                {error && <div className="error">{error}</div>}
                {isPending && <div>Loading...</div>}
                <ProjectHeader header={post.title} />
                <div className="button-group">
                    <Link to="/"><button>Back</button></Link>

                </div>
            </div>
            <div className="content">
                {post && <PostOutput post={post} />}
            </div>
        </div>
    )
}

export default Blog;