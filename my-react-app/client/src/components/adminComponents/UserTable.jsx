import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, updateUser, deleteUser, bulkDelete } from "../../slices/userSlice";
import EditUserModal from "./EditUserModal";
import { FaEdit, FaTrash } from "react-icons/fa";

const UserTable = () => {
    const dispatch = useDispatch();
    const { users, filteredUsers, error } = useSelector((state) => state.user);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedUsersIds, setSelectedUsersIds] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(10);

    useEffect(() => {
        dispatch(fetchUsers({ page: currentPage, limit: usersPerPage }));
    }, [dispatch, currentPage, usersPerPage]);

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handleEdit = (user) => {
        setSelectedUser(user);
        setIsEditModalOpen(true);
    };

    const handleUpdateUser = async (updatedUser) => {
        try {
            const resultAction = await dispatch(updateUser(updatedUser));
            if (updateUser.fulfilled.match(resultAction)) {
                const updatedUsers = users.map((user) => (user._id === updatedUser._id ? updatedUser : user));
                const updatedFilteredUsers = filteredUsers.map((user) => (user._id === updatedUser._id ? updatedUser : user));

                dispatch({ type: "user/setUsers", payload: updatedUsers });
                dispatch({ type: "user/setFilteredUsers", payload: updatedFilteredUsers });

                setIsEditModalOpen(false);
            } else {
                console.log("Error updating user:", resultAction.payload);
            }
        } catch (err) {
            console.error("Error updating user:", err);
        }
    };

    const handleDelete = async (userId) => {
        console.log("delete", userId);
        try {
            await dispatch(deleteUser(userId));
        } catch (err) {
            console.error("Error deleting user:", err);
        }
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            const allUserIds = filteredUsers.map((user) => user._id);
            setSelectedUsersIds(allUserIds);
        } else {
            setSelectedUsersIds([]);
        }
    };

    const handleCheckBoxChange = (userId) => {
        if (selectedUsersIds.includes(userId)) {
            setSelectedUsersIds(selectedUsersIds.filter((id) => id !== userId));
        } else {
            setSelectedUsersIds([...selectedUsersIds, userId]);
        }
    };

    const handleBulkDelete = async () => {
        try {
            if (selectedUsersIds.length > 0) {
                await dispatch(bulkDelete(selectedUsersIds));
                setSelectedUsersIds([]);
            }
        } catch (err) {
            console.log("error occured at bulk delete", err);
        }
    };

    return (
        <div className="container mx-auto mt-24 px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center sm:justify-between">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-4 sm:mb-0">User Management</h2>
                <button
                    disabled={selectedUsersIds.length === 0}
                    onClick={handleBulkDelete}
                    className={`w-full sm:w-auto px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200 ease-in-out ${
                        selectedUsersIds.length === 0 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                >
                    Delete selected
                </button>
            </div>
            <div className="mt-8 flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="relative py-3.5 pl-4 pr-3 sm:pl-6">
                                            <input
                                                type="checkbox"
                                                onChange={handleSelectAll}
                                                checked={selectedUsersIds.length > 0 && selectedUsersIds.length === filteredUsers.length}
                                                className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                            />
                                        </th>
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                            Username
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Email
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Phone
                                        </th>
                                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                            <span className="sr-only">Actions</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {filteredUsers.map((user) => (
                                        <tr key={user._id} className="hover:bg-gray-50">
                                            <td className="relative whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                                <input
                                                    type="checkbox"
                                                    onChange={() => handleCheckBoxChange(user._id)}
                                                    checked={selectedUsersIds.includes(user._id)}
                                                    className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                />
                                            </td>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{user.username}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{user.email}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{user.phone}</td>
                                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                <button onClick={() => handleEdit(user)} className="text-indigo-600 hover:text-indigo-900 mr-4">
                                                    <FaEdit className="inline-block" />
                                                    <span className="ml-1">Edit</span>
                                                </button>
                                                <button onClick={() => handleDelete(user._id)} className="text-red-600 hover:text-red-900">
                                                    <FaTrash className="inline-block" />
                                                    <span className="ml-1">Delete</span>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="flex justify-between items-center mt-6">
                                <button onClick={handlePreviousPage} disabled={currentPage === 1} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg">
                                    Previous
                                </button>
                                <span>Page {currentPage}</span>
                                <button onClick={handleNextPage} disabled={filteredUsers.length < usersPerPage} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg">
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {error && <p className="mt-4 text-red-600">{error}</p>}
            {isEditModalOpen && <EditUserModal user={selectedUser} onClose={() => setIsEditModalOpen(false)} onUpdate={handleUpdateUser} />}
        </div>
    );
};

export default UserTable;
