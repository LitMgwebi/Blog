import { useEffect, useState } from "react";
import log from "../config/logging";
import axios from "axios";
import { useAuthContext } from "./useAuthContext";

const GetOneSecured = (id) => {
    const [headline, setHeadline] = useState("");
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("");
    const [uploadDate, setUploadDate] = useState("");
    const [tag, setTag] = useState("");
    const [photo, setPhoto] = useState("");
    const [introduction, setIntroduction] = useState("");
    const [subHeadline, setSubHeadline] = useState("");
    const [conclusion, setConclusion] = useState("");
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
                    setHeadline(res.data.blog.headline);
                    setContent(res.data.blog.content);
                    setAuthor(res.data.blog.author);
                    setUploadDate(res.data.blog.uploadDate);
                    setTag(res.data.blog.tag);
                    setPhoto(res.data.blog.photo);
                    setIntroduction(res.data.blog.introduction);
                    setSubHeadline(res.data.blog.subHeadline);
                    setConclusion(res.data.blog.conclusion);

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
    const post = {
        headline: headline,
        content: content,
        uploadDate: uploadDate,
        author: author,
        tag: tag,
        introduction: introduction,
        conclusion: conclusion,
        subHeadline: subHeadline,
        photo: photo,
        setHeadline: setHeadline,
        setAuthor: setAuthor,
        setContent: setContent,
        setUploadDate: setUploadDate,
        setTag: setTag,
        setIntroduction: setIntroduction,
        setConclusion: setConclusion,
        setSubHeadline: setSubHeadline,
        setPhoto: setPhoto
    }
    return { post, isPending, error, setError, setIsPending }
}

const GetAllSecured = () => {
    const [posts, setPosts] = useState(null);
    const { user } = useAuthContext();
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(true);

    useEffect(() => {

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
        headline: "",
        content: "",
        uploadDate: "",
        author: "",
        tag: "",
        photo: "",
        introduction: "",
        conclusion: "",
        subHeadline: "",
    })
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios({
            method: "GET",
            url: `http://localhost:4050/home/${id}`,
        }).then((res) => {
            const updatedPost = {
                headline: res.data.blog.headline,
                content: res.data.blog.content,
                author: res.data.blog.author,
                uploadDate: res.data.blog.uploadDate,
                tag: res.data.blog.tag,
                photo: res.data.blog.photo,
                introduction: res.data.blog.introduction,
                conclusion: res.data.blog.conclusion,
                subHeadline: res.data.blog.subHeadline,
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