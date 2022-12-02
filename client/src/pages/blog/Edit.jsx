import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import log from "../../config/logging";
import { GetOneSecured } from "../../hooks/useAxiosGet";
import { useAuthContext } from "../../hooks/useAuthContext";

function Edit() {
    const location = useLocation();
    const navigate = useNavigate();
    // const currentDate = new Date();
    const id = location.state.stateId;
    const { user } = useAuthContext();

    const { post, setPost, isPending, error, setError, setIsPending } = GetOneSecured(id);

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    }
    const handlePhoto = (e) => {
        setPost({ ...post, photo: e.target.files[0] });
        console.log(post.photo)
    }
    function handleSubmit(e) {
        e.preventDefault();
        log.clear();
        if (!user) {
            setError('You must be logged in')
            return
        }

        const formData = new FormData();
        formData.append('title', post.title);
        formData.append('blog', post.blog);
        formData.append('author', post.author)
        formData.append('uploadDate', post.uploadDate)
        formData.append('tagline', post.tagline)
        formData.append('photo', post.photo);

        axios({
            method: 'PUT',
            url: `http://localhost:4050/blog/edit/${id}`,
            data: formData,
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': `multipart/form-data`,
            }
        }).then((res) => {
            setIsPending(false);
            setError(null);
        }).catch((error) => {
            log.error(error.message)
            setIsPending(false);
            setError(error.response.data.error);
        });

        navigate(`/list`);
    }
    return (
        <div id="ContentContainer">
            {error && <div className="error">{error}</div>}
            {isPending && <div>Loading...</div>}

            <h1>Update</h1>
            <form method="PUT" onSubmit={handleSubmit}>
                <div className="titleUpdate">
                    <input
                        type="text"
                        name="title"
                        value={post.title}
                        onChange={handleChange}
                    />
                </div>

                <div className="blogUpdate">
                    <textarea
                        name="blog"
                        value={post.blog}
                        onChange={handleChange}
                    />
                </div>

                <div className="taglineInput">
                    <label>Enter tagline</label>
                    <input
                        name="tagline"
                        type="text"
                        value={post.tagline}
                        onChange={handleChange}
                    />
                </div>

                <div className="authorInput">
                    <input
                        name="author"
                        type="text"
                        value={post.author}
                        onChange={handleChange}
                    />
                </div>

                <div className="dateInput">

                    <input
                        type="date"
                        name="uploadDate"
                        value={post.uploadDate}
                        onChange={handleChange}
                    // defaultValue={currentDate.toString()}
                    />
                </div>

                <div className="photoInput">
                    <div>
                        <img src={`/media/${post.photo}`} alt={post.title} />
                    </div>
                    <label>Photo</label>
                    <input
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        name="photo"
                        onChange={handlePhoto} />
                </div>
                <div className="button-group">
                    <button type="submit" className="btn btn-primary">Update</button>
                    <Link
                        to={`/record/${id}`}
                        state={{ stateId: id }}
                    >
                        <button>Back</button>
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default Edit