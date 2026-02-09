import { useState } from "react";
import { login } from "../api";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login(formData);
            // Save the token directly
            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");
        } catch (err) {
            alert("Invalid username or password");
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", maxWidth: "300px", gap: "10px" }}>
                <input placeholder="Username" onChange={e => setFormData({...formData, username: e.target.value})} required />
                <input placeholder="Password" type="password" onChange={e => setFormData({...formData, password: e.target.value})} required />
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <Link to="/register">Register</Link></p>
        </div>
    );
};
export default Login;