import { Link } from "react-router-dom";
import Card from "../../node_modules/@material-ui/core/Card";
import CardActionArea from "../../node_modules/@material-ui/core/CardActionArea"
import CardContent from "../../node_modules/@material-ui/core/CardContent"
import CardMedia from "../../node_modules/@material-ui/core/CardMedia"

function PostCard({ post, baseURL }) {
    return (
        <Card className="card">
            <Link
                 to={baseURL + post._id}
                 state={{ stateId: post._id }}
            >
                <CardMedia
                    component="img"
                    alt={post.title}
                    image={`/media/${post.photo}`}
                    className="cardMedia"
                />
                <CardContent className='cardContent'>
                <h3 className="cardHeader">{post.title}</h3>
                <h5>{post.author}</h5>
                <p className="cardTagLine">{post.tagLine}</p>
                </CardContent>
                
            </Link>
        </Card>
    )
}
export default PostCard;