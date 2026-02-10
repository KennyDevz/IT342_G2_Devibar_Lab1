import { useEffect, useState } from "react";
import { getCurrentUser } from "../api";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Dashboard.css"; // Import dedicated Dashboard styles

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getCurrentUser()
            .then((res) => setUser(res.data))
            .catch(() => {
                localStorage.removeItem("token");
                navigate("/login");
            });
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    if (!user) return <div className="dashboard-container">Loading...</div>;

    return (
        <div className="dashboard-container">
            <div className="dashboard-card">
                <div className="dashboard-header">
                    <h3 className="app-title">My App</h3>
                    <Link to="/profile" className="profile-icon" title="View Profile">
                        👤
                    </Link>
                </div>

                <div className="dashboard-content">
                    <h1 className="welcome-text">
                        Welcome, {user.fullName.split(" ")[0]}! 👋
                    </h1>
                    <p className="sub-text">
                        You have successfully logged into the system.
                    </p>

                    <button onClick={handleLogout} className="logout-btn">
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;