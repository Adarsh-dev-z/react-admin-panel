import React from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import usePreventCache from "../../customHooks/usePreventCache";

const HomePage = () => {
  const navigate = useNavigate();

  usePreventCache()
  
  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:3000/api/user/logout', {
        withCredentials: true
      });
      // onLogout(); // Clear authentication state
      navigate('/login');
    } catch (err) {
      const errorMessage = err.response || 'An error occurred during logout';
      console.error('Error during logout:', errorMessage);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800">Welcome to the Home Page!</h1>
      <div>
        <button onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default HomePage;
