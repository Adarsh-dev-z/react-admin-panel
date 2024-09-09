



// import React, { useState, useEffect, useCallback } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchUsers, updateUser, deleteUser } from '../../slices/userSlice';
// import EditUserModal from './EditUserModal';
// import { FaEdit, FaTrash } from 'react-icons/fa';

// const UserTable = () => {
//   const dispatch = useDispatch();
//   const { users, loading, error, searchTerm, filteredUsers } = useSelector((state) => state.user);
//   // console.log("filtered users:", filteredUsers)
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);
//   // const [updateTrigger, setUpdateTrigger] = useState(0);

//   useEffect(() => {
//     dispatch(fetchUsers());
//   }, [dispatch, filteredUsers]);

//   useEffect(()=>{
//     console.log("re-renders")
//   }, [])

//   // const filterUsers = useCallback(() => {
//   //   if (searchTerm) {
//   //     return users.filter((user) =>
//   //       user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
//   //       user.email.toLowerCase().includes(searchTerm.toLowerCase())
//   //     );
//   //   }
//   //   return users;
//   // }, [users, searchTerm]);

//   // useEffect(() => {
//   //   setFilteredUsers(filterUsers());
//   // }, [filterUsers, users]);

//   // useEffect(() => {
//   //   console.log('Users updated:', users);
//   // }, [users]);

//   const handleEdit = (user) => {
//     setSelectedUser(user);
//     setIsEditModalOpen(true);
//   };

//   // const handleUpdateUser = async (updatedUser) => {
//   //   // console.log("Before update:", users);
//   //   try {
//   //     const resultAction = await dispatch(updateUser(updatedUser));
//   //     if (updateUser.fulfilled.match(resultAction)) {
//   //       // console.log("Update successful");
//   //       setIsEditModalOpen(false);
//   //       // setUpdateTrigger(prev => prev + 1); 
//   //       // dispatch(fetchUsers());
//   //     } else {
//   //       console.error('Failed to update user:', resultAction.error);
//   //     }
//   //   } catch (err) {
//   //     console.error('Error updating user:', err);
//   //   }
//   //   // console.log("After update:", users);
//   // };

//   const handleUpdateUser = async (updatedUser) => {
//     try {
//       const resultAction = await dispatch(updateUser(updatedUser));
//       if (updateUser.fulfilled.match(resultAction)) {
//         const userIndex = users.findIndex(user => user._id === updatedUser._id);
//         if (userIndex !== -1) {
//           const updatedUsers = [...users];
//           updatedUsers[userIndex] = updatedUser;
//           setUsers(updatedUsers);
//         }
//         setIsEditModalOpen(false);
//       } else {
//         console.error('Failed to update user:', resultAction.error);
//       }
//     } catch (err) {
//       console.error('Error updating user:', err);
//     }
//   };

//   const handleDelete = async(userId)=>{
//     try{
//       await dispatch(deleteUser(userId));
//       await dispatch(fetchUsers());

//     }catch(err){
//       console.error('Error deleting user:', err);
//     }
//   }

//   return (
//     <div className="container mx-auto mt-8">
//       <h2 className="text-2xl font-bold mb-4">User Management</h2>
//       <table className="min-w-full bg-white">
//         <thead>
//           <tr>
//             <th className="py-2 px-4 border-b">Username</th>
//             <th className="py-2 px-4 border-b">Email</th>
//             <th className="py-2 px-4 border-b">Phone</th>
//             <th className="py-2 px-4 border-b">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredUsers.map((user)=>(
//             <tr key={user._id}>
//                 <td className='py-2 px-4 border-b'>{user.username}</td>
//                 <td className='py-2 px-4 border-b'>{user.email}</td>
//                 <td className='py-2 px-4 border-b'>{user.phone}</td>
//                 <td className='py-2 px-4 border-b'>
//                     <button onClick={() => handleEdit(user)} className='text-blue-500 hover:text-blue-700 transition mr-4'>
//                         <FaEdit />
//                     </button>

//                     <button onClick={()=>handleDelete(user._id)} className='text-red-500 hover:text-red-700 transition'>
//                         <FaTrash />
//                     </button>
//                 </td>
                    
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       {isEditModalOpen && (
//         <EditUserModal user={selectedUser}
//          onClose={()=>setIsEditModalOpen(false)} 
//          onUpdate={handleUpdateUser}
//          />
//       )}
      
//     </div>
//   );
// };

// export default UserTable;




// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchUsers, updateUser, deleteUser } from '../../slices/userSlice';
// import EditUserModal from './EditUserModal';
// import { FaEdit, FaTrash } from 'react-icons/fa';

// const UserTable = () => {
//   const dispatch = useDispatch();
//   const { users, loading, error, searchTerm, filteredUsers } = useSelector((state) => state.user);
//   console.log("users:", users)
//   console.log("filterdusers:", filteredUsers)

//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);

//   useEffect(() => {
//     dispatch(fetchUsers());
//   }, [dispatch]);

//   const handleEdit = (user) => {
//     setSelectedUser(user);
//     setIsEditModalOpen(true);
//   };

//   const handleUpdateUser = async (updatedUser) => {
//     try {
//       const resultAction = await dispatch(updateUser(updatedUser));
//       if (updateUser.fulfilled.match(resultAction)) {
//         const userIndex = users.findIndex((user) => user._id === updatedUser._id);
//         if (userIndex !== -1) {
//           const updatedUsers = [...users];
//           updatedUsers[userIndex] = updatedUser;
//           setUsers(updatedUsers);
//         }
//         setIsEditModalOpen(false);
//       } else {
//         console.error('Failed to update user:', resultAction.error);
//       }
//     } catch (err) {
//       console.error('Error updating user:', err);
//     }
//   };

//   const handleDelete = async (userId) => {
//     try {
//       await dispatch(deleteUser(userId));
//       await dispatch(fetchUsers());
//     } catch (err) {
//       console.error('Error deleting user:', err);
//     }
//   };

//   return (
//     <div className="container mx-auto mt-8">
//       <h2 className="text-2xl font-bold mb-4">User Management</h2>
//       <table className="min-w-full bg-white">
//         <thead>
//           <tr>
//             <th className="py-2 px-4 border-b">Username</th>
//             <th className="py-2 px-4 border-b">Email</th>
//             <th className="py-2 px-4 border-b">Phone</th>
//             <th className="py-2 px-4 border-b">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user._id}>
//               <td className="py-2 px-4 border-b">{user.username}</td>
//               <td className="py-2 px-4 border-b">{user.email}</td>
//               <td className="py-2 px-4 border-b">{user.phone}</td>
//               <td className="py-2 px-4 border-b">
//                 <button
//                   onClick={() => handleEdit(user)}
//                   className="text-blue-500 hover:text-blue-700 transition mr-4"
//                 >
//                   <FaEdit />
//                 </button>

//                 <button
//                   onClick={() => handleDelete(user._id)}
//                   className="text-red-500 hover:text-red-700 transition"
//                 >
//                   <FaTrash />
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       {isEditModalOpen && (
//         <EditUserModal user={selectedUser} onClose={() => setIsEditModalOpen(false)} onUpdate={handleUpdateUser} />
//       )}
//     </div>
//   );
// };

// export default UserTable;


import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, updateUser, deleteUser } from '../../slices/userSlice';
import EditUserModal from './EditUserModal';
import { FaEdit, FaTrash } from 'react-icons/fa';

const UserTable = () => {
  const dispatch = useDispatch();
  const { users, filteredUsers, searchTerm, loading, error } = useSelector((state) => state.user);
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  console.log('check render')
  // Fetch users on mount
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
        // Directly update the `users` and `filteredUsers` state without refetching
        const updatedUsers = users.map(user => 
          user._id === updatedUser._id ? updatedUser : user
        );
        
        const updatedFilteredUsers = filteredUsers.map(user => 
          user._id === updatedUser._id ? updatedUser : user
        );

        // Assuming you would maintain local states to reflect these updates
        dispatch({ type: 'user/setUsers', payload: updatedUsers });
        dispatch({ type: 'user/setFilteredUsers', payload: updatedFilteredUsers });

        setIsEditModalOpen(false);
      } else {
        console.error('Failed to update user:', resultAction.error);
      }
    } catch (err) {
      console.error('Error updating user:', err);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await dispatch(deleteUser(userId));
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Username</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Phone</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user._id}>
              <td className="py-2 px-4 border-b">{user.username}</td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">{user.phone}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => handleEdit(user)}
                  className="text-blue-500 hover:text-blue-700 transition mr-4"
                >
                  <FaEdit />
                </button>

                <button
                  onClick={() => handleDelete(user._id)}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isEditModalOpen && (
        <EditUserModal user={selectedUser} onClose={() => setIsEditModalOpen(false)} onUpdate={handleUpdateUser} />
      )}
    </div>
  );
};

export default UserTable;
