import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import log from "../../config/logging";
import { GetOneSecured } from "../../hooks/useAxiosGet";
import { useAuthContext } from "../../hooks/useAuthContext";

function Edit() {
    const location = useLocation();
    const navigate = useNavigate();
    const currentDate = new Date().toUTCString();
    const id = location.state.stateId;
    const { user } = useAuthContext();

    const { post, isPending, error, setError, setIsPending } = GetOneSecured(id);

    const { title, setTitle, blog, setBlog, author, setAuthor, uploadDate, setUploadDate, tagline, setTagline, photo, setPhoto } = post;
    function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('blog', blog);
        formData.append('author', author)
        formData.append('uploadDate', currentDate)
        formData.append('tagline', tagline)
        formData.append('photo', photo);

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
        <form id="ContentContainer" encType='multipart/form-data' onSubmit={handleSubmit}>
            <div className="section">
                {error && <div className="error">{error}</div>}
                {isPending && <div>Loading...</div>}

                <h1>Update</h1>
                <div className="button-group">
                    <button type="submit" className="btn btn-primary">Update</button>
                    <Link
                        to={`/record/${id}`}
                        state={{ stateId: id }}
                    >
                        <button className="btn btn-secondary">Back</button>
                    </Link>
                </div>
            </div>

            <div className="content">
                <div className="formFields">
                    <div className="titleInput">
                        <label>Title:</label>
                        <input
                            type="text"
                            name="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="blogInput">
                        <label>Blog:</label>
                        <textarea
                            name="blog"
                            value={blog}
                            onChange={(e) => setBlog(e.target.value)}
                        />
                    </div>

                    <div className="taglineInput">
                        <label>Tagline:</label>
                        <input
                            name="tagline"
                            type="text"
                            value={tagline}
                            onChange={(e) => setTagline(e.target.value)}
                        />
                    </div>
                </div>

                <div>
                    <div className="authorInput">
                        <label>Author:</label>
                        <input
                            name="author"
                            type="text"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                        />
                    </div>

                    <div className="dateInput">
                        <label>Date:</label>
                        <p>{currentDate}</p>
                    </div>

                    <div className="photo">
                        <div className="photoOutput">
                            <label>Current Photo:</label>
                            <img src={`/media/${post.photo}`} alt={post.title} />
                        </div>

                        <div className="photoInput">
                            <label>Photo:</label>
                            <input
                                type="file"
                                accept="image/*"
                                name="photo"
                                onChange={(e) => setPhoto(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default Edit