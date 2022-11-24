import { useState } from "react";
import axios from "axios";
import {useAuthContext} from './useAuthContext';

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const signup = async (email, password) => {
        setIsLoading(true);
        setError(null)

        const userData = { email:email, password:password };

        axios({
            method: 'POST',
            url: 'http://localhost:4050/user/signup',
            data: userData,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            localStorage.setItem('user', res.data)
            dispatch({type: 'LOGIN', payload: res.data});
            setIsLoading(false);
        }).catch((err) => {
            console.log(err.response.data.error)
            setIsLoading(false);
            setError(err.response.data.error)
        })
    }
    return{signup, isLoading, error}
}