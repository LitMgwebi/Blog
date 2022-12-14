function PostOutput({ post }) {
    return (
        <div className="postOutput">
            <div className="postIntro">
                <div className="introduction">
                    <p>{post.introduction}</p>
                    <h5 className="author">Written by: {post.author}</h5>
                </div>
                <div className="image">
                    <img src={`/media/${post.photo}`} alt={post.title} />
                </div>

            </div>

            <div className="postContent">
                    <h3>{post.subHeadline}</h3>
                    <p>{post.content}</p>
            </div>

            <div className="postConclusion">
                <div className="conclusion">
                    <p>{post.conclusion}</p>
                </div>
                <div className="date">
                    <h5>Uploaded on: {post.uploadDate}</h5>
                </div>
            </div>

        </div>
    )
}

export default PostOutput;