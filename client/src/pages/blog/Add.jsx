import axios from "axios";
import { useState } from "react";
import log from "../../config/logging";
import { useNavigate, Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

function Add() {
    // const currentDate = new Date();
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const [error, setError] = useState(null)

    const [post, setPost] = useState({
        title: "",
        blog: "",
        author: "",
        uploadDate: "",
        tagline: "",
        photo: ""
    })

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    }

    const handlePhoto = (e) => {
        setPost({ ...post, photo: e.target.files[0] });
        console.log(post.photo)
    }
    function handleSubmit(e) {
        e.preventDefault();
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
        <div className="contentContainer">
            {error && <div className="error">{error}</div>}
            <h1>Create</h1>
            <form method="POST" onSubmit={handleSubmit} encType='multipart/form-data'>
                <div className="titleInput">
                    <label>Enter title</label>
                    <input
                        type="text"
                        name="title"
                        value={post.title}
                        onChange={handleChange}
                    />
                </div>

                <div className="blogUpdate">
                    <label>Enter blog</label>
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
                    <label>Enter author name</label>
                    <input
                        name="author"
                        type="text"
                        value={post.author}
                        onChange={handleChange}
                    />
                </div>

                <div className="dateInput">
                    <label>Current Date</label>
                    <input
                        type="date"
                        name="uploadDate"
                        value={post.uploadDate}
                        onChange={handleChange}
                    // defaultValue={currentDate.toString()}
                    />
                </div>

                <div className="photoInput">
                    <label>Photo</label>
                    <input
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        name="photo"
                        onChange={handlePhoto} />
                </div>

                <div className="button-group">
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <Link to="/list"><button>Cancel</button></Link>
                </div>
            </form>

        </div>
    );
}

export default Add;