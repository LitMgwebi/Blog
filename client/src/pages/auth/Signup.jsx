import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";
import { Link } from "react-router-dom";

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signup, error, isLoading } = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await signup(email, password);
    }
    return (
        <div className="authForm">
            <form className="signup" onSubmit={handleSubmit}>
                <h3>Sign up</h3>

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
                    <Link to="/"><button>Back</button></Link>
                    <button disabled={isLoading} type='submit'>Sign up</button>
                </div>

                {error && <div className="error">{error}</div>}
            </form>
        </div>
    );
}

export default Signup;