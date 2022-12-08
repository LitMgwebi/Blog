import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import log from "../../config/logging";
import { GetOneSecured } from "../../hooks/useAxiosGet";
import { useAuthContext } from "../../hooks/useAuthContext";
import FormFields from "../../components/FormFields";

function Edit() {
    const location = useLocation();
    const navigate = useNavigate();
    const currentDate = new Date().toUTCString();
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
        const formData = new FormData();
        formData.append('title', post.title);
        formData.append('blog', post.blog);
        formData.append('author', post.author)
        formData.append('uploadDate', currentDate)
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
                        <button>Back</button>
                    </Link>
                </div>
            </div>

            <div className="content">
                <FormFields post={post} handleChange={handleChange} currentDate={currentDate}handlePhoto={handlePhoto} edit={true}/>
            </div>
        </form>
    )
}

export default Edit