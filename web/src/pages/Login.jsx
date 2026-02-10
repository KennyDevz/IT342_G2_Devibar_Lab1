import { useState } from "react";
import { login } from "../api";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Auth.css"; // Shared styles

export default function Login(){
    const [formData, setFormData] = useState({ 
        username: "", 
        password: "" 
    });
    
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login(formData);
            
            // 1. Save the token to browser storage
            localStorage.setItem("token", response.data.token);
            console.log("Login successful, token saved:", response.data.token);
            // 2. Redirect to the Dashboard
            navigate("/dashboard");
        } catch (err) {
            alert("Invalid username or password");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Welcome Back</h2>
                <form onSubmit={handleSubmit} className="auth-form">
                    <input 
                        className="auth-input"
                        name="username" 
                        placeholder="Username" 
                        value={formData.username} 
                        onChange={handleChange} 
                        required 
                    />
                    <input 
                        className="auth-input"
                        name="password" 
                        type="password" 
                        placeholder="Password" 
                        value={formData.password} 
                        onChange={handleChange} 
                        required 
                    />
                    <button type="submit" className="auth-button">Log In</button>
                </form>
                <div className="auth-footer">
                    Don't have an account? <Link to="/register" className="auth-link">Sign up</Link>
                </div>
            </div>
        </div>
    );
};

