import { useState } from "react";
import { register } from "../api";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Auth.css";

const Register = () => {
    const [formData, setFormData] = useState({ 
        username: "", email: "", password: "", fullName: "" 
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(formData);
            alert("Registration Successful!");
            navigate("/login");
        } catch (err) {
            alert("Registration failed.");
        }
    };

    return (
        <div className="auth-container">
            {/* LEFT SIDE: Relaxing Image */}
            <div className="auth-left">
                <div className="auth-left-content">
                    <h1>Mini App</h1>
                    <p>Join our calm and organized community.</p>
                </div>
            </div>

            {/* RIGHT SIDE: Register Form */}
            <div className="auth-right">
                <div className="auth-form-box">
                    <h2>Create Account</h2>
                    <span className="sub-text">Start your journey with us today.</span>

                    <form onSubmit={handleSubmit}>
                        <input className="auth-input" name="fullName" placeholder="Full Name" onChange={handleChange} required />
                        <input className="auth-input" name="username" placeholder="Username" onChange={handleChange} required />
                        <input className="auth-input" name="email" type="email" placeholder="Email Address" onChange={handleChange} required />
                        <input className="auth-input" name="password" type="password" placeholder="Password" onChange={handleChange} required />
                        
                        <button type="submit" className="auth-button">Sign Up</button>
                    </form>

                    <div className="auth-footer">
                        Already have an account? 
                        <Link to="/login" className="auth-link">Log in</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;