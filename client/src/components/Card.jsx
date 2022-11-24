import { Link } from "react-router-dom";

function Card({post, imgUrl}) {
    return(
        <div className="card">
            <div className="image">
                <img  
                    src={imgUrl} 
                    alt="Lithi" 
                />
            </div>
            <div className="post" key={post._id}>
                <h3>{post.title}</h3>
                <h5>{post.author}</h5>
                <p>{post.tagline}</p>
            </div>
            <div className="cardButton">
                <Link
                    to={`/record/${post._id}`}
                    state={{stateId: post._id}}
                >
                    <button >View</button>
                </Link>
            </div>
        </div>
    )
}

export default Card;