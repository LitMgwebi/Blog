import axios from "axios";
import { useState } from "react";
import log from "../../config/logging";
import { useNavigate, Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

function Add() {
    const currentDate = new Date().toGMTString();
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const [error, setError] = useState(null)

    const [title, setTitle] = useState("");
    const [blog, setBlog] = useState("");
    const [author, setAuthor] = useState("");
    const [uploadDate, setUploadDate] = useState("");
    const [tagline, setTagline] = useState("");
    const [photo, setPhoto] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('blog', blog);
        formData.append('author', author)
        formData.append('uploadDate', currentDate)
        formData.append('tagline', tagline)
        formData.append('photo', photo);

        console.log(blog, tagline, photo, author, currentDate, tagline)
        axios({
            method: "POST",
            url: "http://localhost:4050/blog/add",
            data: formData,
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': `multipart/form-data`,
            }
        }).then((res) => {
            setError(null);
        }).catch((error) => {
            log.error(error.response.data.error);
            setError(error.response.data.error);
        });

        navigate("/list");
    }
    return (
        <form method="POST" id="ContentContainer" onSubmit={handleSubmit} encType='multipart/form-data'>
            <div className="section">
                {error && <div className="error">{error}</div>}
                <h1>Create</h1>
                <div className="button-group">
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <Link to="/list"><button>Cancel</button></Link>
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

                    <div className="photoInput">
                        <label>Photo:</label>
                        <input
                            type="file"
                            accept="image/*"
                            name="photo"
                            value={photo}
                            onChange={(e) => setPhoto(e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </form>
    );
}

export default Add;