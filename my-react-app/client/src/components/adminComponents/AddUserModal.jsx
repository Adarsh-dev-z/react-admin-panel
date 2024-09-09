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
        console.log(data, "data");
        await dispatch(addUser(data));
        await dispatch(fetchUsers());

        onClose();
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <h3 className="text-lg font-bold mb-4">Add User</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            {...register("username", { required: "username is required", validate: (value) => value.trim() !== "" || `username cannot be empty` })}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            {...register("email", { required: "email is required", validate: (value) => value.trim() !== "" || `email cannot be empty` })}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                            Phone
                        </label>
                        <input
                            type="text"
                            name="phone"
                            {...register("phone", { required: "phone is required", validate: (value) => value.trim() !== "" || `phone cannot be empty` })}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                            Password
                        </label>
                        <input
                            type="text"
                            name="password"
                            {...register("password", { required: "password is required", validate: (value) => value.trim() !== "" || `password cannot be empty` })}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                            Password
                        </label>
                        <input
                            type="text"
                            name="confirmpassword"
                            {...register("confirmPassword", {
                                validate: (value) => value === password || "Passwords do not match",
                            })}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Save
                        </button>
                        <button type="button" onClick={onClose} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddUserModal;
