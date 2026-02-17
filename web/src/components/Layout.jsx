import { useEffect, useState } from "react";
import { Outlet, useNavigate, Link, useLocation } from "react-router-dom";
import { getCurrentUser } from "../api";
import "../styles/Layout.css"; // We will create this next

const Layout = () => {
    const [user, setUser] = useState(null);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // 1. Fetch User (Shared for all pages)
    useEffect(() => {
        getCurrentUser()
            .then((res) => setUser(res.data))
            .catch(() => {
                localStorage.removeItem("token");
                navigate("/login");
            });
    }, [navigate]);

    // 2. Logout Logic
    const handleLogoutClick = () => setShowLogoutModal(true);
    const cancelLogout = () => setShowLogoutModal(false);
    const confirmLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    if (!user) return <div className="layout-loading">Loading...</div>;

    const initial = user.fullName ? user.fullName.charAt(0).toUpperCase() : "?";

    return (
        <div className="layout-container">
            {/* --- PERSISTENT NAVBAR --- */}
            <nav className="navbar">
                <Link to="/dashboard" className="nav-brand">Mini App</Link>
                
                <div className="nav-actions">
                    {/* Link to Profile (Highlight if active) */}
                    <Link 
                        to="/profile" 
                        className={`nav-profile ${location.pathname === '/profile' ? 'active' : ''}`} 
                        title="My Profile"
                    >
                        {initial}
                    </Link>

                    <button onClick={handleLogoutClick} className="nav-logout">
                        Logout
                    </button>
                </div>
            </nav>

            {/* --- PAGE CONTENT (Changes based on route) --- */}
            <div className="page-content">
                <Outlet context={{ user }} />
            </div>

            {/* --- LOGOUT MODAL (Shared) --- */}
            {showLogoutModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Confirm Logout</h3>
                        <p>Are you sure you want to leave?</p>
                        <div className="modal-actions">
                            <button onClick={cancelLogout} className="btn-modal btn-cancel">Cancel</button>
                            <button onClick={confirmLogout} className="btn-modal btn-confirm">Yes, Logout</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Layout;