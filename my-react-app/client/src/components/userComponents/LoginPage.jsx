import React from "react";
import { useForm } from "react-hook-form";
import { Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import usePreventBackNavigation from "../../customHooks/usePreventBackNavigation";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../slices/authSlice";

const LoginPage = () => {
    const dispatch = useDispatch();
    const { error, isAuthenticated, userRole } = useSelector((state) => state.auth);
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();
    usePreventBackNavigation();

    useEffect(() => {
        if (isAuthenticated) {
            navigate(userRole === "admin" ? "/admin" : "/home", { replace: true });
        }
    }, [isAuthenticated]);

    const onSubmit = async (data) => {
        dispatch(login(data));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Login</h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className="relative">
                            <Mail className="absolute top-3 left-3 text-gray-400" />
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                {...register("email", { required: "Email is required" })}
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500
                                 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm pl-10"
                                placeholder="Email address"
                            />
                        </div>
                        <div className="relative">
                            <Lock className="absolute top-3 left-3 text-gray-400" />
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                {...register("password", { required: "Password is required" })}
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500
                                 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm pl-10"
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
                    {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>}
                    {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md
                             text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Login
                        </button>
                    </div>
                </form>
                <div className="text-center">
                    <p className="mt-2 text-sm text-gray-600">
                        Don't have an account?{" "}
                        <button
                            onClick={() => navigate("/register")} // Navigate to register page
                            className="text-indigo-600 hover:text-indigo-500"
                        >
                            Register here
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
