import {Link} from "react-router-dom";
import { useLocation } from "react-router";
import PostOutput from "../../../components/PostOutput";
import useAxiosGet from "../../../hooks/useAxiosGet";

function Record() {
    const location =  useLocation();
    const id = location.state.stateId;

    const {payload, isPending, error} = useAxiosGet(id);

    return (
        <div className="Record">
            {error && <div className="error">{error}</div>}
            {isPending && <div>Loading...</div>}
            {payload && <PostOutput post={payload} title="Record"/>}

            <div className="button-group">
                    <button><a href="/list">Back</a></button>
                    <Link 
                         to={`/edit/${id}`}
                         state={{ stateId: id}}
                    >
                         <button> Update </button>
                    </Link>
                    <Link 
                         to={`/remove/${id}`}
                         state={{ stateId: id}}
                    >
                         <button>Delete</button>
                    </Link>
               </div>
        </div>
    )
}

export default Record;