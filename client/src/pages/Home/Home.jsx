import { GetAll } from '../../hooks/useAxiosGet';
import PostCard from "../../components/PostCard";

function Home() {
    const { posts, error, isPending } = GetAll()

    return (
        <div id="ContentContainer">
            <div className="section">
                {error && <div className="error">{error}</div>}
                {isPending && <div>Loading...</div>}
                <h1>Blog Site</h1>
            </div>
            <div className='content'>
                {posts && posts.map((post, i) => {
                    return (
                        <PostCard post={post} baseURL="/" />
                    );
                })}
            </div>
        </div>
    )
}

export default Home;