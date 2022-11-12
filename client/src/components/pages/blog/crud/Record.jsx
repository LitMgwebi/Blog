import {Link} from "react-router-dom";
import { useLocation } from "react-router";
import useAxiosGet from "../../../layout/useAxiosGet";
import PostOutput from "../../../layout/PostOutput";

function Record() {
    const location =  useLocation();
    const id = location.state.stateId;

    const {payload, isPending, error} = useAxiosGet(`http://localhost:2550/record/${id}`);

    return (
        <div className="Record">
            {error && <div>{error}</div>}
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