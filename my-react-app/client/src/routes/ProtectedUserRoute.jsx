import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedUserRoute() {
    const { isAuthenticated, userRole } = useSelector((state) => state.auth);

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (userRole !== "user") {
        return <Navigate to="/admin" replace />;
    }

    return <Outlet />;
}

export default ProtectedUserRoute;
