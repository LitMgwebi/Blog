import {Link, useNavigate} from "react-router-dom";
import { useLocation } from "react-router";
import PostOutput from "../../components/PostOutput";
import useAxiosGet from "../../hooks/useAxiosGet";
import log from "../../config/logging";
import axios from "axios";
import {useAuthContext} from "../../hooks/useAuthContext";

function Record() {
     const location =  useLocation();
     const id = location.state.stateId;
     const navigate = useNavigate();
     const {user} = useAuthContext();

     const {post, isPending, setIsPending, setError, error} = useAxiosGet(id);

     const handleConfirm = () => {
          if (window.confirm("Are you sure you want to delete"))
               handleDelete();
     }

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
               setIsPending(false);
               setError(null);
          }).catch((error) => {
               log.error(error.message);
               setIsPending(false);
               setError(error.response.data.error);
          });
          navigate('/list');
     }
     
    return (
          <div className="Record">
               {error && <div className="error">{error}</div>}
               {isPending && <div>Loading...</div>}
               {post && <PostOutput post={post} title="Record"/>}

               <div className="button-group">
                        <Link to="/list"><button>Back</button></Link>
                         <Link 
                              to={`/edit/${id}`}
                              state={{ stateId: id}}
                         >
                              <button> Edit </button>
                         </Link>
                         <button onClick={handleConfirm}>
                              Delete
                         </button>
                    </div>
          </div>
    )
}

export default Record;