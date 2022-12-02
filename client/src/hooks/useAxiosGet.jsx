import { useEffect, useState } from "react";
import log from "../config/logging";
import axios from "axios";
import { useAuthContext } from "./useAuthContext";

const GetOneSecured = (id) => {
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
    const { user } = useAuthContext();

    useEffect(() => {
        if (id !== null) {
            if (user) {
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
                    setPost(post => ({
                        ...post,
                        ...updatedPost
                    }));
                    setIsPending(false);
                    setError(null);
                }).catch((error) => {
                    setIsPending(false);
                    setError(error.response.data.error);
                });
            } else {
                setError("Cannot access user to get blog");
            }
        } else {
            setError("Did not recieve blog id, please navigate to list")
        }
    }, [id, user]);

    return { post, isPending, error, setPost, setError, setIsPending }
}

const GetAllSecured = () => {
    const [posts, setPosts] = useState(null);
    const { user } = useAuthContext();
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(true);

    useEffect(() => {
        log.clear();

        if (user) {
            axios({
                method: "GET",
                url: "http://localhost:4050/blog/list",
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            }).then((res) => {
                if (res.data.error != null) {
                    log.error(res.data.error);
                    return;
                }
                setPosts(res.data.blog)
                setIsPending(false);
                setError(null);

            }).catch((error) => {
                setIsPending(false);
                setError(error.response.data.error);
            })
        }
    }, [user]);

    return { posts, isPending, error, setPosts, setError, setIsPending }
}

const GetAll = () => {
    const [posts, setPosts] = useState(null);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(true);

    useEffect(() => {
        axios({
            method: "GET",
            url: "http://localhost:4050/home/",
            // headers: {
            //     'Authorization': `Bearer ${user.token}`
            // }
        }).then((res) => {
            if (res.data.error != null) {
                log.error(res.data.error);
                return;
            }
            setPosts(res.data.blog)
            setIsPending(false);
            setError(null);

        }).catch((error) => {
            setIsPending(false);
            setError(error.response.data.error);
        });

    }, []);

    return { posts, error, isPending }
}

const GetOne = (id) => {
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

    useEffect(() => {
        axios({
            method: "GET",
            url: `http://localhost:4050/home/${id}`,
            // headers: {
            //     'Authorization': `Bearer ${user.token}`
            // }
        }).then((res) => {
            const updatedPost = {
                title: res.data.blog.title,
                blog: res.data.blog.blog,
                author: res.data.blog.author,
                uploadDate: res.data.blog.uploadDate,
                tagline: res.data.blog.tagline,
                photo: res.data.blog.photo
            };
            setPost(post => ({
                ...post,
                ...updatedPost
            }));
            setIsPending(false);
            setError(null);
        }).catch((error) => {
            setIsPending(false);
            setError(error.response.data.error);
        });

    }, [id]);

    return { post, isPending, error }
}
export { GetOneSecured, GetAllSecured, GetAll, GetOne };