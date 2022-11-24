import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {useLocation} from "react-router";
import log from "../../../config/logging";
import PostOutput from "../../../components/PostOutput";
import useAxiosGet from "../../../hooks/useAxiosGet";
function Remove() {
    const [status, setStatus] = useState("")
    const location = useLocation();
    const id = location.state.stateId;
    const navigate = useNavigate();
    
    const {payload, isPending, error, setError} = useAxiosGet(`/blog/record/${id}`);

    function handleDelete() {
        log.clear();
        axios
            .delete(`/blog/remove/${id}`)
            .then((res) => {
                setStatus(res.status);
                setError(null);
            }).catch((error) => {
                log.error(error.message);
                setError(error.message);
            });
        navigate('/list');
    }
    return(
        <div className="delete">
            
            {error && <div className="error">{error}</div>}
            {isPending && <div>Loading...</div>}
            {payload && <PostOutput post={payload} title="Delete"/>}

            <div className="button-group">
                <Link
                        to={`/record/${id}`}
                        state={{ stateId: id}}
                >
                        <button>Back</button>
                </Link>
                <button onClick={handleDelete}>Delete</button>
            </div>

            {status && status}
        </div>
    );
}

export default Remove;