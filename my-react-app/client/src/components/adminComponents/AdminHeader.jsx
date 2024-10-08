import React, { useState } from "react";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import AddUserModal from "./AddUserModal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { addUser, setSearchTerm } from "../../slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { adminLogout } from "../../slices/authSlice";

const AdminHeader = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, isAuthenticated, userRole, searchTerm } = useSelector((state) => state.auth);
    const [isAddModalOpen, setIsAddUserModalOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const handleSearchChange = (event) => {
        dispatch(setSearchTerm(event.target.value));
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
    };

    const addUserHandler = () => {
        setIsAddUserModalOpen(true);
    };

    const handleAddUser = (data) => {
        dispatch(addUser(data));
        setIsAddUserModalOpen(false);
    };

    const LogoutHandler = async () => {
        await dispatch(adminLogout());
        navigate("/admin-login");
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <>
            <header className="fixed top-0 left-0 w-full bg-gray-100 shadow-md z-50 flex justify-between items-center p-4">
                <div className="text-left">
                    <h2 className="text-xl font-extrabold text-gray-800">      </h2>
                </div>
                <div className="flex items-center space-x-4">
                    <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                        <FaSearch className="absolute left-2 text-gray-500" />
                        <input type="text" placeholder="Search users..." className="pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" 
                        value={searchTerm} onChange={handleSearchChange} />
                    </form>
                    <div className="lg:hidden">
                        <button onClick={toggleMenu} className="text-gray-800 hover:text-blue-400 transition">
                            <FaBars size={24} />
                        </button>
                    </div>
                    <div className="hidden lg:flex space-x-2">
                        <button onClick={addUserHandler} className="bg-white text-gray-800 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-200 transition">
                            Add User
                        </button>
                        <button onClick={LogoutHandler} className="bg-white text-gray-800 px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-200 transition">
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            {menuOpen && (
                <div className={`fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-40 transition-opacity duration-300 ease-in-out ${menuOpen ? "opacity-100" : "opacity-0"}`}>
                    <div className="relative bg-white rounded-md p-6 shadow-lg w-64 transform transition-transform duration-300 ease-in-out">
                        <button onClick={toggleMenu} className="absolute top-4 right-4 text-gray-800 hover:text-red-500 transition">
                            <FaTimes size={16} />
                        </button>
                        <div className="flex flex-col space-y-4 mt-8">
                            <button onClick={addUserHandler} className="bg-white text-gray-800 px-4 py-2 rounded-md hover:bg-gray-200 transition">
                                Add User
                            </button>
                            <button onClick={LogoutHandler} className="bg-white text-gray-800 px-4 py-2 rounded-md hover:bg-gray-200 transition">
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isAddModalOpen && <AddUserModal onClose={() => setIsAddUserModalOpen(false)} onAdd={handleAddUser} />}
        </>
    );
};

export default AdminHeader;
