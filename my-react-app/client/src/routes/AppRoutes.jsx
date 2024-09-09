import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import RegisterPage from "../components/userComponents/RegisterPage";
import LoginPage from "../components/userComponents/LoginPage";
import HomePage from "../components/userComponents/HomePage";
import AdminLoginPage from "../components/adminComponents/AdminLoginPage";
import AdminBody from "../components/adminComponents/AdminBody";
import ProtectedUserRoute from "./ProtectedUserRoute";
import ProtectedAdminRoute from "./ProtectedAdminRoute";

function AppRoutes() {
    const { isAuthenticated, userRole } = useSelector((state) => state.auth);

    return (
        <Router>
            <div className="AppContainer">
                <Routes>
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/login" element={isAuthenticated && userRole === "user" ? <Navigate to="/home" replace /> : <LoginPage />} />
                    <Route path="/admin-login" element={isAuthenticated && userRole === "admin" ? <Navigate to="/admin" replace /> : <AdminLoginPage />} />
                    <Route element={<ProtectedUserRoute />}>
                        <Route path="/home" element={<HomePage />} />
                    </Route>
                    <Route element={<ProtectedAdminRoute />}>
                        <Route path="/admin" element={<AdminBody />} />
                    </Route>
                    <Route path="*" element={<Navigate to={isAuthenticated ? (userRole === "admin" ? "/admin" : "/home") : "/login"} replace />} />
                </Routes>
            </div>
        </Router>
    );
}

export default AppRoutes;
