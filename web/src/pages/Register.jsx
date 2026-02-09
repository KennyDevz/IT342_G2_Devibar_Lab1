import { useState } from "react";
import { register } from "../api";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
    const [formData, setFormData] = useState({
        username: "", email: "", password: "", fullName: ""
    });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(formData);
            alert("Registration Successful! Please login.");
            navigate("/login");
        } catch (err) {
            alert("Registration failed. Try a different username/email.");
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Register</h2>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", maxWidth: "300px", gap: "10px" }}>
                <input placeholder="Username" onChange={e => setFormData({...formData, username: e.target.value})} required />
                <input placeholder="Email" type="email" onChange={e => setFormData({...formData, email: e.target.value})} required />
                <input placeholder="Password" type="password" onChange={e => setFormData({...formData, password: e.target.value})} required />
                <input placeholder="Full Name" onChange={e => setFormData({...formData, fullName: e.target.value})} required />
                <button type="submit">Register</button>
            </form>
            <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
    );
};
export default Register;