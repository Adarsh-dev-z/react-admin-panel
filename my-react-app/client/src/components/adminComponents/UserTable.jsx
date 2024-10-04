// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchUsers, updateUser, deleteUser } from "../../slices/userSlice";
// import EditUserModal from "./EditUserModal";
// import { FaEdit, FaTrash } from "react-icons/fa";

// const UserTable = () => {
//     const dispatch = useDispatch();
//     const { users, filteredUsers, error } = useSelector((state) => state.user);
//     const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//     const [selectedUser, setSelectedUser] = useState(null);

//     useEffect(() => {
//         dispatch(fetchUsers());
//     }, [dispatch]);

//     const handleEdit = (user) => {
//         setSelectedUser(user);
//         setIsEditModalOpen(true);
//     };

//     const handleUpdateUser = async (updatedUser) => {
//         try {
//             const resultAction = await dispatch(updateUser(updatedUser));
//             if (updateUser.fulfilled.match(resultAction)) {

//                 const updatedUsers = users.map((user) => (user._id === updatedUser._id ? updatedUser : user));
//                 const updatedFilteredUsers = filteredUsers.map((user) => (user._id === updatedUser._id ? updatedUser : user));

//                 dispatch({ type: "user/setUsers", payload: updatedUsers });
//                 dispatch({ type: "user/setFilteredUsers", payload: updatedFilteredUsers });

//                 setIsEditModalOpen(false);
//             } else {
//                 console.log("Error updating user:", resultAction.payload);
//             }
//         } catch (err) {
//             console.error("Error updating user:", err);
//         }
//     };

//     const handleDelete = async (userId) => {
//         try {
//              await dispatch(deleteUser(userId));
//         } catch (err) {
//             console.error("Error deleting user:", err);
//         }
//     };

//     return (
//         <div className="container mx-auto mt-8">
//             <h2 className="text-2xl font-bold mb-4">User Management</h2>
//             <table className="min-w-full bg-white">
//                 <thead>
//                     <tr>
//                         <th className="py-2 px-4 border-b">Username</th>
//                         <th className="py-2 px-4 border-b">Email</th>
//                         <th className="py-2 px-4 border-b">Phone</th>
//                         <th className="py-2 px-4 border-b">Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {filteredUsers.map((user) => (
//                         <tr key={user._id}>
//                             <td className="py-2 px-4 border-b">{user.username}</td>
//                             <td className="py-2 px-4 border-b">{user.email}</td>
//                             <td className="py-2 px-4 border-b">{user.phone}</td>
//                             <td className="py-2 px-4 border-b">
//                                 <button onClick={() => handleEdit(user)} className="text-blue-500 hover:text-blue-700 transition mr-4">
//                                     <FaEdit />
//                                 </button>

//                                 <button onClick={() => handleDelete(user._id)} className="text-red-500 hover:text-red-700 transition">
//                                     <FaTrash />
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//              {error && <p className="text-red-500">{error}</p>}   

//             {isEditModalOpen && <EditUserModal user={selectedUser} onClose={() => setIsEditModalOpen(false)} onUpdate={handleUpdateUser} />}
    
//         </div>

//     );
// };

// export default UserTable;






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

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

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
        try {
             await dispatch(deleteUser(userId));
        } catch (err) {
            console.error("Error deleting user:", err);
        }
    };

    const handleSelectAll = (e) =>{
        if(e.target.checked){
            const allUserIds = filteredUsers.map((user)=>user._id);
            setSelectedUsersIds(allUserIds)
        }else{
            setSelectedUsersIds([])
        }
    };

    const handleCheckBoxChange = (userId) =>{
        if(selectedUsersIds.includes(userId)){
            setSelectedUsersIds(selectedUsersIds.filter((id)=>id!==userId))
        }
        else{
            setSelectedUsersIds([...selectedUsersIds, userId])
        }
    }

    const handleBulkDelete = async() =>{
        try{
            if(selectedUsersIds.length > 0){
               await dispatch(bulkDelete(selectedUsersIds));
               setSelectedUsersIds([]);
            }
        }
        catch(err){
            console.log("error occured at bulk delete",err)
        }
    }
console.log(selectedUsersIds)
    

    return (
        <div className="container mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-4">User Management</h2>
            <button 
                disabled={selectedUsersIds.length==0}
                onClick={handleBulkDelete}
                className={`mb-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ${selectedUsersIds.length === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                Delete selected
            </button>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">
                            <input 
                                type="checkbox"
                                onChange={handleSelectAll}
                                checked={selectedUsersIds.length > 0 && selectedUsersIds.length === filteredUsers.length}

                                />
                        </th>
                        <th className="py-2 px-4 border-b">Username</th>
                        <th className="py-2 px-4 border-b">Email</th>
                        <th className="py-2 px-4 border-b">Phone</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map((user) => (
                        <tr key={user._id}>
                            <td
                                className="py-2 px-4 border-b">
                                    <input type="checkbox"
                                    onChange={()=>handleCheckBoxChange(user._id)}
                                    checked={selectedUsersIds.includes(user._id)}

                                    />

                            </td>
                            <td className="py-2 px-4 border-b">{user.username}</td>
                            <td className="py-2 px-4 border-b">{user.email}</td>
                            <td className="py-2 px-4 border-b">{user.phone}</td>
                            <td className="py-2 px-4 border-b">
                                <button onClick={() => handleEdit(user)} className="text-blue-500 hover:text-blue-700 transition mr-4">
                                    <FaEdit />
                                </button>

                                <button onClick={() => handleDelete(user._id)} className="text-red-500 hover:text-red-700 transition">
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

             {error && <p className="text-red-500">{error}</p>}   

            {isEditModalOpen && <EditUserModal user={selectedUser} onClose={() => setIsEditModalOpen(false)} onUpdate={handleUpdateUser} />}
    
        </div>

    );
};

export default UserTable;







