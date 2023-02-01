import axios from "axios";
import { useState } from "react";
import log from "../../config/logging";
import { useNavigate, Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

function Add() {
    const currentDate = new Date().toUTCString();
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const [error, setError] = useState(null)

    const [headline, setHeadline] = useState("");
    const [content, setContent] = useState("");
    // const [author, setAuthor] = useState("");
    // const [uploadDate, setUploadDate] = useState("");
    const [tag, setTag] = useState("");
    const [photo, setPhoto] = useState("");
    const [introduction, setIntroduction] = useState("");
    const [subHeadline, setSubHeadline] = useState("");
    const [conclusion, setConclusion] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append('headline', headline);
        formData.append('content', content);
        formData.append('author', user.email);
        formData.append('photo', photo);
        formData.append('uploadDate', currentDate);
        formData.append('tag', tag);
        formData.append('introduction', introduction);
        formData.append('subHeadline', subHeadline);
        formData.append('conclusion', conclusion);

        // console.log(blog, tagline, photo, author, currentDate, tagline)
        axios({
            method: "POST",
            url: "https://discount-twitter-api.onrender.com:4050/blog/add",
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
        <form id="ContentContainer" onSubmit={handleSubmit} encType='multipart/form-data'>
            <div className="section">
                {error && <div className="error">{error}</div>}
                <h1>Create</h1>
                <div className="button-group">
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <Link to="/list"><button>Cancel</button></Link>
                </div>
            </div>
            <div className="information">
                <div className="formFields">
                    <div className="headlineInput">
                        <label>Headline:</label>
                        <input
                            type="text"
                            name="headline"
                            value={headline}
                            onChange={(e) => setHeadline(e.target.value)}
                        />
                    </div>

                    <div className="subHeadlineInput">
                        <label>Sub-headline:</label>
                        <input
                            type="text"
                            name="subHeadline"
                            value={subHeadline}
                            onChange={(e) => setSubHeadline(e.target.value)}
                        />
                    </div>

                    <div className="introductionInput">
                        <label>Introduction:</label>
                        <textarea
                            name="introduction"
                            value={introduction}
                            onChange={(e) => setIntroduction(e.target.value)}
                        />
                    </div>

                    <div className="contentInput">
                        <label>Content:</label>
                        <textarea
                            name="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>

                    <div className="conclusionInput">
                        <label>Conclusion:</label>
                        <textarea
                            name="conclusion"
                            value={conclusion}
                            onChange={(e) => setConclusion(e.target.value)}
                        />
                    </div>

                    <div className="tagInput">
                        <label>Tag:</label>
                        <input
                            name="tag"
                            type="text"
                            value={tag}
                            onChange={(e) => setTag(e.target.value)}
                        />
                    </div>
                    
                    <div className="photoInput">
                        <label>Photo:</label>
                        <input
                            type="file"
                            accept="image/*"
                            name="photo"
                            onChange={(e) => setPhoto(e.target.files[0])}
                        />
                    </div>
                </div>
            </div>
        </form>
    );
}

export default Add;