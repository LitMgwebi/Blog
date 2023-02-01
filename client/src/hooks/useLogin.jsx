import { useState } from "react";
import axios from "axios";
import { useAuthContext } from './useAuthContext';
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();
    const navigate = useNavigate();

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null)

        const userData = JSON.stringify({ email, password });

        axios({
            method: 'POST',
            url: 'https://discount-twitter-api.onrender.com:4050/user/login',
            data: userData,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            localStorage.setItem('user', JSON.stringify(res.data));
            dispatch({ type: 'LOGIN', payload: res.data });
            setIsLoading(false);
            navigate("/list");
        }).catch((error) => {
            console.log(error.response.data.error)
            setIsLoading(false);
            setError(error.response.data.error)
        });

    }
    return { login, isLoading, error }
}