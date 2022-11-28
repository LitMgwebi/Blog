import axios from "axios";
import {useState} from "react";
import log from "../../../config/logging";
import {useNavigate, Link} from "react-router-dom";
import {useAuthContext} from "../../../hooks/useAuthContext";

function Add() {
    const currentDate = new Date();
    const navigate = useNavigate();
    const {user} = useAuthContext();
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(true);

    const [title, setTitle] = useState("");
    const [blog, setBlog] = useState("");
    const [author, setAuthor] = useState("");
    const [tagline, setTagline] = useState("");
    
    function handleSubmit(e) {
        e.preventDefault();
        if (!user) {
            setError('You must be logged in')
            return
        }
        const userData = {
            title: title,
            blog: blog,
            uploadDate: currentDate,
            author: author,
            tagline: tagline
        }
        axios({
            method: "POST",
            url: "http://localhost:4050/blog/add",
            data: userData,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        }).then((res) => {
            setIsPending(false);
            setError(null);
        }).catch((error) => {
            log.error(error.response.data.error);
            setIsPending(false);
            setError(error.response.data.error);
        });

        navigate("/list");
    }
    return(
        <div className="contentContainer">
            {error && <div className="error">{error}</div>}
            {isPending && <div>Loading...</div>}
            <h1>Create</h1>
                <form method="POST" onSubmit={handleSubmit}>
                    <div className="titleInput">
                        <label>Enter title</label>
                        <input 
                            type="text"
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value);
                            }}  
                        />
                    </div>

                    <div className="blogInput">
                        <label>Enter blog</label>
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
                        <label>Enter author name</label>
                        <input 
                            type="text"
                            value={author}
                            onChange={(e) => {
                                setAuthor(e.target.value);
                            }}  
                        />
                    </div>

                    <div className="dateInput">
                        <label>Current Date</label>
                        <input 
                            type="text"
                            defaultValue={currentDate.toString()}
                        />
                    </div>

                    <div className="button-group">
                            <button type="submit" className="btn btn-primary">Submit</button>
                            <Link to="/list"><button>Cancel</button></Link>
                    </div>
               </form>

        </div>
    );
}

export default Add;