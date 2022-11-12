import { useEffect, useState } from "react";
import axios from "axios";
import log from "../../config/logging";

const useAxiosGet = (url) => {
    const [title, setTitle] = useState("");
    const [blog, setBlog] = useState("");
    const [author, setAuthor] = useState("");
    const [uploadDate, setUploadDate] = useState("");
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        log.clear();

        axios.get(url)
            .then((res) => {
                if(res.data.error != null){
                    log.error(res.data.error)
                    throw Error(res.data.error);
                } else {
                    setTitle(res.data.blog.title);
                    setBlog(res.data.blog.blog);
                    setAuthor(res.data.blog.author);
                    setUploadDate(res.data.blog.uploadDate);

                    setIsPending(false);
                    setError(null);
                }
            }).catch((error) => {
                log.error(error.message);
                setIsPending(false);
                setError(error.message);
            });
    },[url]);

    const payload = {
        title: title,
        blog: blog,
        uploadDate: uploadDate,
        author: author,
        setTitle: setTitle,
        setAuthor: setAuthor,
        setBlog: setBlog,
        setUploadDate: setUploadDate
    }

    return {payload, isPending, error}
}

export default useAxiosGet;