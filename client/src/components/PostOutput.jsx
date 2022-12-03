function PostOutput({ post }) {
    return (
        <div className="postOutput">
            <h2>{post.title}</h2>
            <br />
            <img src={`/media/${post.photo}`} alt={post.title} />
            <br />
            <h3>{post.author}</h3>
            <br />
            <p>{post.tagline}</p>
            <br />
            <p>{post.blog}</p>
            <br />
            <p>{post.uploadDate}</p>
        </div>
    )
}

export default PostOutput;