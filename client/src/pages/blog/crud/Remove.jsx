import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {useLocation} from "react-router";
import log from "../../../config/logging";
import PostOutput from "../../../components/PostOutput";
import useAxiosGet from "../../../hooks/useAxiosGet";
import {useAuthContext} from "../../../hooks/useAuthContext";

function Remove() {
    const [status, setStatus] = useState("")
    const location = useLocation();
    const id = location.state.stateId;
    const navigate = useNavigate();
    const {user} = useAuthContext();
    
    const {payload, isPending, error, setError, setIsPending} = useAxiosGet(id);

    function handleDelete() {
        if(!user){
            return
        }
        log.clear();
        axios({
            method: "DELETE",
            url: `http://localhost:4050/blog/remove/${id}`,
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        }).then((res) => {
            setStatus(res.status);
            setIsPending(false);
            setError(null);
        }).catch((error) => {
            log.error(error.message);
            setIsPending(false);
            setError(error.response.data.error);
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