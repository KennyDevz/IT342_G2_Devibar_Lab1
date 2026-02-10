import { useState } from "react";
import { register } from "../api"; 
import { useNavigate, Link } from "react-router-dom";
import "../styles/Auth.css"; 

export default function Register(){
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        fullName: ""
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
            await register(formData);
            alert("Registration Successful! Please login.");
            navigate("/login");
        } catch (err) {
            console.error("Registration Error:", err);
            alert("Registration failed. Username or Email might already exist.");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Create Account</h2>
                <form onSubmit={handleSubmit} className="auth-form">
                    <input 
                        className="auth-input"
                        name="fullName" 
                        placeholder="Full Name" 
                        value={formData.fullName} 
                        onChange={handleChange} 
                        required 
                    />
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
                        name="email" 
                        type="email" 
                        placeholder="Email Address" 
                        value={formData.email} 
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
                    <button type="submit" className="auth-button">Sign Up</button>
                </form>
                <div className="auth-footer">
                    Already have an account? <Link to="/login" className="auth-link">Log in</Link>
                </div>
            </div>
        </div>
    );
};
