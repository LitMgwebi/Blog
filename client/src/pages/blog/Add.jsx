import axios from "axios";
import { useState } from "react";
import log from "../../config/logging";
import { useNavigate, Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import FormFields from "../../components/FormFields";

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
                <FormFields post={post} handleChange={handleChange} handlePhoto={handlePhoto}/>
            </div>
        </form>
    );
}

export default Add;