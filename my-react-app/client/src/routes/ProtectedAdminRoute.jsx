// routes/ProtectedAdminRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedAdminRoute() {
    const { isAuthenticated, userRole } = useSelector((state) => state.auth);

    if (!isAuthenticated) {
        return <Navigate to="/admin-login" replace />;
    }

    if (userRole !== "admin") {
        return <Navigate to="/home" replace />;
    }

    return <Outlet />;
}

export default ProtectedAdminRoute;
