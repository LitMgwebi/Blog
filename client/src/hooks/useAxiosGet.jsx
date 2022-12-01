import { useEffect, useState } from "react";
import axios from "axios";
import log from "../config/logging";
import { useAuthContext } from "./useAuthContext";

const useAxiosGet = (id) => {
    const [post, setPost] = useState({
        title: "",
        blog: "",
        author: "",
        uploadDate: "",
        tagline: "",
        photo: "",
    })
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const {user} = useAuthContext();

    useEffect(() => {
        if(id !== null){
            if(user){
                axios({
                    method: "GET",
                    url: `http://localhost:4050/blog/record/${id}`,
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                }).then((res) => {
                    const updatedPost = {
                        title: res.data.blog.title,
                        blog: res.data.blog.blog,
                        author: res.data.blog.author,
                        uploadDate: res.data.blog.uploadDate,
                        tagline: res.data.blog.tagline,
                        photo: res.data.blog.photo
                    };
                    setPost(post =>({
                        ...post,
                        ...updatedPost
                    }));
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

    return {post, isPending, error, setPost, setError, setIsPending}
}

export default useAxiosGet;