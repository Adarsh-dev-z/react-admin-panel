import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { User, Mail, Lock, Key, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import usePreventBackNavigation from "../../customHooks/usePreventBackNavigation";
import usePreventCache from "../../customHooks/usePreventCache";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../slices/authSlice";

const RegisterPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const {
        handleSubmit,
        register: formRegister,
        watch,
        formState: { errors },
    } = useForm();
    const { error } = useSelector((state) => state.auth);
    const password = watch("password");

    usePreventCache();
    usePreventBackNavigation();

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            const resultAction = await dispatch(register(data));

            if (register.fulfilled.match(resultAction)) {
                navigate("/home", { replace: true });
            } else {
                console.log("Registration error", resultAction.payload);
            }
        } catch (error) {
            console.log("Unexpected error", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create an Account</h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className="relative">
                            <User className="absolute top-3 left-3 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Username"
                                {...formRegister("username", {
                                    required: "Username is required",
                                    validate: (value) => value.trim() !== "" || "Username cannot be empty",
                                })}
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm pl-10"
                            />

                            {errors.username && <p className="mt-2 text-sm text-red-600">{errors.username.message}</p>}
                        </div>
                        <div className="relative">
                            <Mail className="absolute top-3 left-3 text-gray-400" size={18} />
                            <input
                                type="email"
                                placeholder="Email"
                                {...formRegister("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: "Invalid email address",
                                    },
                                })}
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm pl-10"
                            />

                            {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
                        </div>
                        <div className="relative">
                            <Phone className="absolute top-3 left-3 text-gray-400" size={18} />
                            <input
                                type="tel"
                                placeholder="Phone"
                                {...formRegister("phone", {
                                    required: "Phone number is required",
                                    pattern: {
                                        value: /^[0-9]{10}$/,
                                        message: "Phone number must be 10 digits long and contain only numbers",
                                    },
                                })}
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm pl-10"
                                maxLength={10}
                            />
                            {errors.phone && <p className="mt-2 text-sm text-red-600">{errors.phone.message}</p>}
                        </div>

                        <div className="relative">
                            <Lock className="absolute top-3 left-3 text-gray-400" size={18} />
                            <input
                                type="password"
                                placeholder="Password"
                                {...formRegister("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 8,
                                        message: "Password must be at least 8 characters long",
                                    },
                                    validate: (value) => /\d/.test(value) || "Password must contain at least one number",
                                })}
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm pl-10"
                            />
                            {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>}
                        </div>
                        <div className="relative">
                            <Key className="absolute top-3 left-3 text-gray-400" size={18} />
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                {...formRegister("confirmPassword", {
                                    validate: (value) => value === password || "Passwords do not match",
                                })}
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm pl-10"
                            />
                            {errors.confirmPassword && <p className="mt-2 text-sm text-red-600">{errors.confirmPassword.message}</p>}
                        </div>
                    </div>

                    {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

                    <div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                        >
                            {isSubmitting ? "Registering..." : "Register"}
                        </button>
                    </div>
                </form>
                <div className="text-center">
                    <p className="mt-2 text-sm text-gray-600">
                        Already have an account?{" "}
                        <button onClick={() => navigate("/login")} className="text-indigo-600 hover:text-indigo-500">
                            Login here
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
