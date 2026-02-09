import { useEffect, useState } from "react";
import { getCurrentUser } from "../api";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getCurrentUser()
            .then((res) => setUser(res.data))
            .catch(() => {
                // If token is invalid or expired, force logout
                localStorage.removeItem("token");
                navigate("/login");
            });
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    if (!user) return <p>Loading...</p>;

    return (
        <div style={{ padding: "20px" }}>
            <h1>Welcome, {user.fullName}!</h1>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>User ID:</strong> {user.userID}</p>
            <button onClick={handleLogout} style={{ backgroundColor: "red", color: "white", padding: "10px" }}>
                Logout
            </button>
        </div>
    );
};
export default Dashboard;