import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import log from "../../config/logging";
import { GetOneSecured } from "../../hooks/useAxiosGet";
import { useAuthContext } from "../../hooks/useAuthContext";

function Edit() {
    const location = useLocation();
    const navigate = useNavigate();
    const currentDate = new Date().toLocaleDateString();
    const id = location.state.stateId;
    const { user } = useAuthContext();

    const { post, isPending, error, setError, setIsPending } = GetOneSecured(id);

    const { headline, content, tag, introduction, conclusion, subHeadline,photo, setPhoto, setHeadline, setContent, setTag, setIntroduction, setConclusion, setSubHeadline } = post;
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
            log.error(error.response.data.error);
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
                        <label>Subheadline:</label>
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
    )
}

export default Edit