import { useEffect, useState } from "react";
import { getCurrentUser } from "../api";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Dashboard.css"; 

export default function Dashboard(){
    const [user, setUser] = useState(null);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getCurrentUser()
            .then((res) => setUser(res.data))
            .catch(() => {
                localStorage.removeItem("token");
                navigate("/login");
            });
    }, [navigate]);

    const handleLogoutClick = () => {
        setShowLogoutModal(true);
    };

    const confirmLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const cancelLogout = () => {
        setShowLogoutModal(false);
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

                    <button onClick={handleLogoutClick} className="logout-btn">
                        Logout
                    </button>
                </div>
            </div>

            {showLogoutModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Confirm Logout</h3>
                        <p>Are you sure you want to leave?</p>
                        <div className="modal-actions">
                            <button onClick={cancelLogout} className="btn-cancel">
                                Cancel
                            </button>
                            <button onClick={confirmLogout} className="btn-confirm">
                                Yes, Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
