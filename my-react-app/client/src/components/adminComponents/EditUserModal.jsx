import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const EditUserModal = ({ user, onClose, onUpdate }) => {
    const { error } = useSelector((state) => state.user);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: user
    });

    const onSubmit = async (data) => {
        try {
            await onUpdate(data);
            onClose();
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <h3 className="text-lg font-bold mb-4">Edit User</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            type="text"
                            {...register("username", { 
                                required: "Username is required", 
                                validate: value => (value && value.trim() !== "") || `Username cannot be empty` 
                            })}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {errors.username && <p className="text-red-500">{errors.username.message}</p>}
                    </div>
    
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            {...register("email", { 
                                required: "Email is required", 
                                validate: {
                                    notEmpty: value => (value && value.trim() !== "") || `Email cannot be empty`,
                                    isValidEmail: value => /^[^\s@]+@gmail\.com$/.test(value) || `Email must be a valid @gmail.com address`
                                } 
                            })}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                    </div>
    
                    <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
        Phone
    </label>
    <input
        type="text" 
        id="phone" 
        {...register("phone", { 
            required: "Phone is required", 
            validate: {
                notEmpty: value => (value && value.trim() !== "") || "Phone cannot be empty",
                isValidPhone: value => /^\d{10}$/.test(value) || "Phone must be 10 digits"
            } 
        })}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        maxLength={10}
    />
    {errors.phone && <p className="text-red-500">{errors.phone.message}</p>} 
</div>

    
                    <div className="flex items-center justify-between">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Update
                        </button>
                        <button type="button" onClick={onClose} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Cancel
                        </button>
                    </div>
                </form>
                {error && <p className="text-red-500 mt-4">{error}</p>}
            </div>
        </div>
    );
};

export default EditUserModal;