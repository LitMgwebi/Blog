function PostOutput({ post }) {
    return (
        <div className="postOutput">
            <div className="postText">
                <div className="section1">
                    <p>
                        {post.introduction}
                        <br/>
                        {post.subHeadline}
                        <br/>
                        {post.blog}
                        <br/>
                        {post.conclusion}
                    </p>

                </div>
                <div className="section2">
                    <h3>{post.author}</h3>
                    <p>{post.tag}</p>
                    <p>{post.uploadDate}</p>
                </div>


            </div>
            {/* <div className="postImage">
                <img src={`/media/${post.photo}`} alt={post.title} />
            </div> */}
        </div>
    )
}

export default PostOutput;