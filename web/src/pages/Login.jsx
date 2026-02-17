import { useState } from "react";
import { login } from "../api";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Auth.css";

const Login = () => {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login(formData);
            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");
        } catch (err) {
            alert("Invalid credentials!");
        }
    };

    return (
        <div className="auth-container">
            {/* LEFT SIDE: Relaxing Image & Branding */}
            <div className="auth-left">
                <div className="auth-left-content">
                    <h1>Mini App</h1>
                    <p>Relax, organize, and get things done.</p>
                </div>
            </div>

            {/* RIGHT SIDE: Login Form */}
            <div className="auth-right">
                <div className="auth-form-box">
                    <h2>Welcome Back</h2>
                    <span className="sub-text">Please enter your details to sign in.</span>
                    
                    <form onSubmit={handleSubmit}>
                        <input 
                            className="auth-input"
                            name="username" 
                            placeholder="Username" 
                            onChange={handleChange} 
                            required 
                        />
                        <input 
                            className="auth-input"
                            name="password" 
                            type="password" 
                            placeholder="Password" 
                            onChange={handleChange} 
                            required 
                        />
                        <button type="submit" className="auth-button">Sign In</button>
                    </form>

                    <div className="auth-footer">
                        Don't have an account? 
                        <Link to="/register" className="auth-link">Create one</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;