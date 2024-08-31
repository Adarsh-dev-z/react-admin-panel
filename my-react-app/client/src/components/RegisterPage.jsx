import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaUser, FaEnvelope, FaLock, FaKey } from "react-icons/fa";

const RegisterPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { handleSubmit, register, watch, formState: { errors } } = useForm();

  // Watch password and confirmPassword fields
  const password = watch('password');
  const confirmPassword = watch('confirmPassword');

  const onSubmit = (data) => {
    setIsSubmitting(true);
    console.log("Form Submitted:", data);
    setIsSubmitting(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-white">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-xl mx-4">
        <h2 className="text-3xl font-semibold text-gray-700 mb-8 text-center">Create an Account</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Username Field */}
          <div className="relative">
            <FaUser className="absolute left-4 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Username"
              {...register('username', { required: 'Username is required' })}
              className={`w-full pl-12 pr-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                errors.username ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
          </div>

          {/* Email Field */}
          <div className="relative">
            <FaEnvelope className="absolute left-4 top-3 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              {...register('email', { required: 'Email is required' })}
              className={`w-full pl-12 pr-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          {/* Password Field */}
          <div className="relative">
            <FaLock className="absolute left-4 top-3 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              {...register('password', { required: 'Password is required' })}
              className={`w-full pl-12 pr-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          {/* Confirm Password Field */}
          <div className="relative">
            <FaKey className="absolute left-4 top-3 text-gray-400" />
            <input
              type="password"
              placeholder="Confirm Password"
              {...register('confirmPassword', {
                validate: (value) => value === password || 'Password mismatching',
              })}
              className={`w-full pl-12 pr-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              }`}
            />
            {/* Display error message for password mismatch */}
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-400 text-white py-3 rounded-full hover:bg-blue-500 transition disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
