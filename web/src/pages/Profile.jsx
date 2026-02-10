import { useEffect, useState } from "react";
import { getCurrentUser } from "../api";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css"; // Import dedicated Profile styles

const Profile = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getCurrentUser()
            .then((res) => setUser(res.data))
            .catch(() => navigate("/login"));
    }, [navigate]);

    if (!user) return <div className="profile-container">Loading...</div>;

    return (
        <div className="profile-container">
            <div className="profile-card">
                <div className="profile-avatar">
                    👤
                </div>
                
                <div className="profile-header">
                    <h2>{user.fullName}</h2>
                    <span className="profile-role">Standard User</span>
                </div>

                <div className="profile-details">
                    <div className="detail-item">
                        <span className="detail-label">Username</span>
                        <div className="detail-value">{user.username}</div>
                    </div>
                    <div className="detail-item">
                        <span className="detail-label">Email Address</span>
                        <div className="detail-value">{user.email}</div>
                    </div>
                </div>

                <button onClick={() => navigate("/dashboard")} className="back-btn">
                    Back to Dashboard
                </button>
            </div>
        </div>
    );
};

export default Profile;