import { useOutletContext, useNavigate } from "react-router-dom";
import "../styles/Profile.css";

const Profile = () => {
    const { user } = useOutletContext();
    const navigate = useNavigate(); // Only needed for back button
    const initial = user.fullName ? user.fullName.charAt(0).toUpperCase() : "?";

    return (
        <div className="profile-card">
            <div className="profile-avatar-large">
                {initial}
            </div>

            <div className="profile-header">
                <h2>{user.fullName}</h2>
                <span className="profile-role">Full Stack Developer</span>
            </div>

            <div className="profile-details">
                <div className="detail-item">
                    <span className="detail-label">Username</span>
                    <span className="detail-value">@{user.username}</span>
                </div>
                <div className="detail-item">
                    <span className="detail-label">Email</span>
                    <span className="detail-value">{user.email}</span>
                </div>
                <div className="detail-item">
                    <span className="detail-label">Status</span>
                    <span className="detail-value" style={{color: "#26a69a"}}>Active ●</span>
                </div>
            </div>

            <button onClick={() => navigate("/dashboard")} className="btn-back">
                Back to Dashboard
            </button>
        </div>
    );
};

export default Profile;