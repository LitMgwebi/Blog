import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import { Link } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, error, isLoading } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            await login(email, password)
        }catch(error){
            console.error(error)
        }
    }
    return (
        <div className="authForm">
            <form className="login" onSubmit={handleSubmit}>
                <h3>Login</h3>

                <label>Email: </label>
                <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />

                <label>Password: </label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="button-group">
                    <button disabled={isLoading} type='submit'>Login</button>
                    <Link to="/"><button>Back</button></Link>
                </div>

                {error && <div className="error">{error}</div>}
            </form>
        </div>
    );
}

export default Login;