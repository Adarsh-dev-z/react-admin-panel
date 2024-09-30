// components/AppContent.jsx
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { checkAuthStatus } from "../../slices/authSlice";
import AppRoutes from "../../routes/AppRoutes";

function AppContent() {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.auth);
    useEffect(() => {
        dispatch(checkAuthStatus());
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }
    return <AppRoutes />;
}

export default AppContent;
