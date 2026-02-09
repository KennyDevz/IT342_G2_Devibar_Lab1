import axios from 'axios';

// If you used 'create-react-app', your backend must allow port 3000.
// If you used 'Vite', it allows port 5173.
const API_URL = "http://localhost:8080/api";

const api = axios.create({
    baseURL: API_URL,
});

// Automatically add the Token to every request if we have one
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const register = (user) => api.post("/auth/register", user);
export const login = (credentials) => api.post("/auth/login", credentials);
export const getCurrentUser = () => api.get("/user/me");

export default api;