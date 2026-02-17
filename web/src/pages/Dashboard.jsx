import { useOutletContext } from "react-router-dom";
import "../styles/Dashboard.css";

const Dashboard = () => {
    // Receive user data directly from Layout
    const { user } = useOutletContext();
    const firstName = user.fullName ? user.fullName.split(" ")[0] : "Friend";

    return (
        <div className="welcome-card">
            <h1 className="welcome-title">Hello, {firstName}!</h1>
            <p className="welcome-subtitle">
                Welcome to your personal space. <br/>
                Everything is calm, organized, and ready for you.
            </p>
            <div style={{ marginTop: "20px", fontSize: "40px" }}>
                🌿 ☕ 🎧
            </div>
        </div>
    );
};

export default Dashboard;