import React, { useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const UserTable = ({ users, onDelete, onEdit }) => {
    const [selectedUsers, setSelectedUsers] = useState([]);

    const handleSelectUser = (userId) => {
        setSelectedUsers((prevSelected) =>
            prevSelected.includes(userId)
                ? prevSelected.filter((id) => id !== userId)
                : [...prevSelected, userId]
        );
    };

    const handleDeleteSelected = () => {
        onDelete(selectedUsers);
        setSelectedUsers([]);
    };

    return (
        <div className="p-4">
            {/* Delete Selected Button */}
            {selectedUsers.length > 0 && (
                <button
                    onClick={handleDeleteSelected}
                    className="bg-red-500 text-white px-4 py-2 rounded-md mb-4 hover:bg-red-600 transition"
                >
                    Delete Selected
                </button>
            )}

            <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-md">
                <thead className="bg-gray-100 border-b border-gray-300">
                    <tr>
                        <th className="px-6 py-3 text-left text-gray-600 font-medium">Select</th>
                        <th className="px-6 py-3 text-left text-gray-600 font-medium">Username</th>
                        <th className="px-6 py-3 text-left text-gray-600 font-medium">Email</th>
                        <th className="px-6 py-3 text-left text-gray-600 font-medium">Phone</th>
                        <th className="px-6 py-3 text-left text-gray-600 font-medium">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {users.map((user) => (
                        <tr key={user.id} className="border-b border-gray-300">
                            <td className="px-6 py-4">
                                <input
                                    type="checkbox"
                                    checked={selectedUsers.includes(user.id)}
                                    onChange={() => handleSelectUser(user.id)}
                                    className="form-checkbox"
                                />
                            </td>
                            <td className="px-6 py-4 text-gray-800">{user.username}</td>
                            <td className="px-6 py-4 text-gray-800">{user.email}</td>
                            <td className="px-6 py-4 text-gray-800">{user.phone}</td>
                            <td className="px-6 py-4">
                                <button
                                    onClick={() => onEdit(user.id)}
                                    className="text-blue-500 hover:text-blue-700 transition mr-4"
                                >
                                    <FaEdit size={18} />
                                </button>
                                <button
                                    onClick={() => onDelete([user.id])}
                                    className="text-red-500 hover:text-red-700 transition"
                                >
                                    <FaTrashAlt size={18} />
                                </button>
                            </td>
                        </tr>
                    ))} */}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;
