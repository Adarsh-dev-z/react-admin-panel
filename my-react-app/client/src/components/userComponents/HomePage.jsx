

import React from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import usePreventCache from "../../customHooks/usePreventCache";
import usePreventBackNavigation from "../../customHooks/usePreventBackNavigation";

const HomePage = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  usePreventCache();
  usePreventBackNavigation();

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:3000/api/user/logout', {
        withCredentials: true
      });
      setIsAuthenticated(false);
      navigate('/login', { replace: true });
    } catch (err) {
      console.error('Error during logout:', err.response?.data?.message || 'An error occurred during logout');
      // Even if there's an error, we should still log out the user on the client side
      setIsAuthenticated(false);
      navigate('/login', { replace: true });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Welcome to the Home Page!</h1>
      <button 
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default HomePage;