

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { User, Mail, Lock, Key } from "lucide-react";
import { useNavigate } from "react-router-dom";
import usePreventBackNavigation from "../../customHooks/usePreventBackNavigation";
import usePreventCache from "../../customHooks/usePreventCache";



const RegisterPage = ({ setIsAuthenticated, setUserRole }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const { handleSubmit, register, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const password = watch('password');

  usePreventCache();
  usePreventBackNavigation();

  const onSubmit = async (data, e) => {
    e.preventDefault(); // Prevent default form submission
    setIsSubmitting(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:3000/api/user/register', data, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log("Registration successful:", response.data);
      setIsAuthenticated(true);
      setUserRole('user'); 
      navigate('/home', { replace: true });
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred during registration');
      console.log('Registration error', error.response?.data);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create an Account</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Username"
              {...register('username', { required: 'Username is required', validate: (value)=>value.trim()!=="" || "Username cannot be empty" })}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="email"
              placeholder="Email"
              {...register('email', { required: 'Email is required', validate: (value)=>value.trim()!=="" || "Email cannot be empty" })}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="number"
              placeholder="Phone"
              {...register('phone', { required: 'Phone number is required', validate: (value)=>value.trim()!=="" || "Phone cannot be empty" })}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="password"
              placeholder="Password"
              {...register('password', { required: 'Password is required', validate: (value)=>value.trim()!=="" || "Password cannot be empty"    })}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <div className="relative">
            <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="password"
              placeholder="Confirm Password"
              {...register('confirmPassword', {
                validate: (value) => value === password || 'Passwords do not match',
              })}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gray-600 text-white py-2 rounded-md hover:bg-gray-500 transition duration-300 ease-in-out disabled:opacity-50"
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    </div>
  );
};

export default RegisterPage;
