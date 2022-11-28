import { useEffect, useState } from "react";
import axios from "axios";
import log from "../config/logging";
import { useAuthContext } from "./useAuthContext";

const useAxiosGet = (id) => {
    const [title, setTitle] = useState("");
    const [blog, setBlog] = useState("");
    const [author, setAuthor] = useState("");
    const [uploadDate, setUploadDate] = useState("");
    const [tagline, setTagline] = useState("");
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const {user} = useAuthContext();

    useEffect(() => {
        // log.clear();
        if(id !== null){
            if(user){
                axios({
                    method: "GET",
                    url: `http://localhost:4050/blog/record/${id}`,
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                }).then((res) => {
                    setTitle(res.data.blog.title);
                    setBlog(res.data.blog.blog);
                    setAuthor(res.data.blog.author);
                    setUploadDate(res.data.blog.uploadDate);
                    setTagline(res.data.blog.tagline);

                    setIsPending(false);
                    setError(null);
                }).catch((error) => {
                    log.error(error.response.data.error);
                    setIsPending(false);
                    setError(error.response.data.error);
                });
            }else{
                setError("Cannot access user to get blog");
            }
        } else {
            setError("Did not recieve blog id, please navigate to list")
        }
    },[id, user]);

    const payload = {
        title: title,
        blog: blog,
        uploadDate: uploadDate,
        author: author,
        tagline: tagline,
        setTitle: setTitle,
        setAuthor: setAuthor,
        setBlog: setBlog,
        setUploadDate: setUploadDate,
        setTagline: setTagline
    }

    return {payload, isPending, error, setError, setIsPending}
}

export default useAxiosGet;