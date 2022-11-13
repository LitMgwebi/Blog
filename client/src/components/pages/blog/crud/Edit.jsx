import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {useLocation} from "react-router";
import log from "../../../../config/logging";
import useAxiosGet from "../../../layout/useAxiosGet";

function Edit() {
    const location = useLocation();
    const navigate = useNavigate();
    const currentDate = new Date();
    const id = location.state.stateId;
    const [status, setStatus] = useState("");

    const {payload, isPending, error} = useAxiosGet(`http://localhost:2550/edit/${id}`);
    const {title, blog, author, uploadDate, tagline, setTitle, setBlog, setAuthor, setTagline} = payload;

    function handleUpdate(e) {
        e.preventDefault();
        log.clear();
        
        const userData = {
            title:title,
            blog: blog,
            uploadDate: uploadDate,
            author: author
        }

        axios.put(`http://localhost:2550/edit/${id}`, userData)
            .then((res) => {
                setStatus(res.status)
            }).catch((error) => {
                log.error(error.message)
            });

        navigate(`/list`);
    }
    return(
        <div className="Edit">
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}

            <h1>Update</h1>
            <form method="PUT" onSubmit={handleUpdate}>
                <div className="titleUpdate">
                    <input 
                            type="text"
                            value={title} 
                            onChange={(e) => 
                                {setTitle(e.target.value)}
                            } 
                    />
               </div>

               <div className="blogUpdate">
                    <textarea
                            value={blog}
                            onChange={(e) => {
                                setBlog(e.target.value)
                            }} 
                    />
               </div>
                
               <div className="taglineInput">
                        <label>Enter tagline</label>
                        <input 
                            type="text"
                            value={tagline}
                            onChange={(e) => {
                                setTagline(e.target.value);
                            }}  
                        />
                </div>

               <div className="authorInput">
                    <input 
                              type="text"
                              value={author} 
                              onChange={(e) => 
                                   {setAuthor(e.target.value)}
                              } 
                    />
               </div>

               <div className="dateInput">
                    <p>{currentDate.toString()}</p>
               </div>

               <div className="button-group">
                    <button type="submit" className="btn btn-primary">Update</button>
                    <Link
                         to={`/record/${id}`}
                         state={{ stateId: id}}
                    >
                         <button>Back</button>
                    </Link>
               </div>
            </form>

            {status && status}
        </div>
    )
}

export default Edit