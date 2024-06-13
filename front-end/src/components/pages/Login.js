import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ setJwtToken }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        // Simulate a login and set the JWT token
        const fakeJwtToken = "";
        setJwtToken(fakeJwtToken);
        navigate("/tasks");
    };

    return (
        <div className="container">
            <h2>Login</h2>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default Login;
