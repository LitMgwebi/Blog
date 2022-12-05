function PostOutput({ post }) {
    return (
        <div className="postOutput">
            <div className="postText">
                <div className="section1">
                    <p>{post.blog}</p>

                </div>
                <div className="section2">
                    <h3>{post.author}</h3>
                    <p>{post.tagline}</p>
                    <p>{post.uploadDate}</p>
                </div>
            </div>
            <div className="postImage">
                <img src={`/media/${post.photo}`} alt={post.title} />
            </div>
        </div>
    )
}

export default PostOutput;