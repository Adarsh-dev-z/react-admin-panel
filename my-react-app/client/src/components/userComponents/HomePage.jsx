import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../slices/authSlice";
import usePreventCache from "../../customHooks/usePreventCache";
import usePreventBackNavigation from "../../customHooks/usePreventBackNavigation";

const HomePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    usePreventCache();
    usePreventBackNavigation();

    const handleLogout = async () => {
        try {
            await dispatch(logout()).unwrap();
            navigate("/login", { replace: true });
        } catch (error) {
            console.error("An error occurred during logout:", error.message || error);

            alert("An error occurred during logout. Please try again.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-100">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">Welcome to the Home Page!</h1>
            <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Logout
            </button>

            <div>

            </div>
            
        </div>
    );
};

export default HomePage;
