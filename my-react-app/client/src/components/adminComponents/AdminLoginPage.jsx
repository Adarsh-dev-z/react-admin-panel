import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Mail, Lock } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import usePreventBackNavigation from "../../customHooks/usePreventBackNavigation";

const AdminLoginPage = ({ setIsAuthenticated, setUserRole }) => {  // Accept setIsAdminAuthenticated as a prop
  const { handleSubmit, register, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("")
  usePreventBackNavigation();


  const onSubmit = async (data) => {
    console.log("Login data:", data);
    try {
      const response = await axios.post(
        'http://localhost:3000/api/admin/admin-login',
        data,
        { withCredentials: true }
      );
      console.log("Login successful:", response.data);

      // Update the authentication state
      setIsAuthenticated(true);
      setUserRole('admin');
      
      // Navigate to home after successful login
      navigate('/admin', {replace:true});

    } catch (err) {
      const errorMessage = err.response?.data?.message || 'An error occurred during login';
      console.error('Admin Login error:', errorMessage);
      setLoginError(errorMessage);
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Admin Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="email"
              placeholder="Email"
              {...register('email', { required: 'Email is required' })}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="password"
              placeholder="Password"
              {...register('password', { required: 'Password is required' })}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          {loginError && <p className="text-red-500 text-sm">{loginError}</p>}

          <button
            type="submit"
            className="w-full bg-gray-600 text-white py-2 rounded-md hover:bg-gray-500 transition duration-300 ease-in-out"
          >
            Login
          </button>

        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
