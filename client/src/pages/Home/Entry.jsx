import { useLocation } from "react-router";
import PostOutput from "../../components/PostOutput";
import ProjectHeader from "../../components/ProjectHeader";
import { GetOne } from "../../hooks/useAxiosGet";
import { Link } from "react-router-dom";

function Entry() {
    const location = useLocation();
    const id = location.state.stateId;

    const { post, isPending, error } = GetOne(id);
    return (
        <div id="ContentContainer">
            <div className="section">
                {error && <div className="error">{error}</div>}
                {isPending && <div>Loading...</div>}
                <ProjectHeader header={post.headline} />
                <div className="button-group">
                    <Link to="/"><button>Back</button></Link>

                </div>
            </div>
            <div className="information">
                {post && <PostOutput post={post} />}
            </div>
        </div>
    )
}

export default Entry;