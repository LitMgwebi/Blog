import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {useLocation} from "react-router";
import log from "../../../../config/logging";
import useAxiosGet from "../../../layout/useAxiosGet";
import PostOutput from "../../../layout/PostOutput";

function Remove() {
    const [status, setStatus] = useState("")
    const location = useLocation();
    const id = location.state.stateId;
    const navigate = useNavigate();
    
    const {payload, isPending, error} = useAxiosGet(`http://localhost:2550/remove/${id}`);

    function handleDelete() {
        log.clear();
        axios
            .delete(`http://localhost:2550/remove/${id}`)
            .then((res) => {
                setStatus(res.status);
            }).catch((error) => {
                log.error(error.message);
            });
        navigate('/list');
    }
    return(
        <div className="delete">
            
            {error && <div>{error}</div>}
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