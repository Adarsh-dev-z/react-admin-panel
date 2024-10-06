import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { addUser, fetchUsers } from "../../slices/userSlice";
import { useDispatch } from "react-redux";

const AddUserModal = ({ onClose }) => {
    const dispatch = useDispatch();
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const password = watch("password");

    const onSubmit = async (data) => {
        await dispatch(addUser(data));
        await dispatch(fetchUsers());
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <h3 className="text-lg font-bold mb-4">Add User</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Username Field */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            {...register("username", {
                                required: "Username is required",
                                validate: (value) => value.trim() !== "" || "Username cannot be empty",
                            })}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {errors.username && <p className="text-red-500">{errors.username.message}</p>}
                    </div>
    
                    {/* Email Field */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            {...register("email", {
                                required: "Email is required",
                                validate: (value) =>
                                    value.trim() !== "" ||
                                    (/\S+@\S+\.\S+/.test(value) || "Email must be a valid format"),
                            })}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                    </div>
    
                   {/* Phone Field */}
<div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
        Phone
    </label>
    <input
        type="text" // Keeping the type as 'text'
        id="phone" // Set the id for the label association
        name="phone" // Name for the input field
        {...register("phone", {
            required: "Phone number is required",
            validate: (value) =>
                value.trim() !== "" &&
                (/^\d{10}$/.test(value) || "Phone number must be 10 digits"),
        })}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        maxLength={10} // Limit input to 10 characters
    />
    {errors.phone && <p className="text-red-500">{errors.phone.message}</p>} {/* Error message for phone */}
</div>

    
                    {/* Password Field */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            {...register("password", {
                                required: "Password is required",
                                validate: (value) =>
                                    value.trim() !== "" &&
                                    (value.length >= 8 || "Password must be at least 8 characters"),
                            })}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                    </div>
    
                    {/* Confirm Password Field */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            {...register("confirmPassword", {
                                validate: (value) =>
                                    value === watch("password") || "Passwords do not match",
                            })}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
                    </div>
    
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
    
};

export default AddUserModal;
