


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import EditUserModal from './EditUserModal';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, updateUser, deleteUser } from '../../slices/userSlice';

const UserTable = ({searchTerm}) => {

  const dispatch = useDispatch();
  const { users, loading, error} = useSelector((state)=> state.user);

    // const [users, setUsers] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [filteredUser, setFilteredUser]= useState([]);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    // useEffect(()=>{
    //   if(newUser){
    //     setUsers(prevUsers=>[...prevUsers,newUser])
    //   }
    // }, [newUser])

    useEffect(()=>{
      if(searchTerm){
        const filtered = users.filter((user)=>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setFilteredUser(filtered)
      }
      else{
        setFilteredUser(users)
      }

    },[searchTerm, users])

  // const fetchUser = async() =>{
  //   try{
  //       const response = await axios.get('http://localhost:3000/api/admin/users', {withCredentials:true});
  //       setUsers(response.data.users);
  //   }catch(err){
  //       console.log('Error fetching users',err);
  //   }
  // }

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleUpdateUser = async(updatedUser)=>{
    dispatch(updateUser(updatedUser));
    setIsEditModalOpen(false);
  }

  const handleDelete = async(userId)=>{
    if(window.confirm('Are you sure you want to delete this user?')){
       dispatch(deleteUser(userId));
    }
  }

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
          {filteredUser.map((user)=>(
            <tr key={user._id}>
                <td className='py-2 px-4 border-b'>{user.username}</td>
                <td className='py-2 px-4 border-b'>{user.email}</td>
                <td className='py-2 px-4 border-b'>{user.phone}</td>
                <td className='py-2 px-4 border-b'>
                    <button onClick={() => handleEdit(user)} className='text-blue-500 hover:text-blue-700 transition mr-4'>
                        <FaEdit />
                    </button>

                    <button onClick={()=>handleDelete(user._id)} className='text-red-500 hover:text-red-700 transition'>
                        <FaTrash />
                    </button>
                </td>
                    
            </tr>
          ))}
        </tbody>
      </table>
      {isEditModalOpen && (
        <EditUserModal user={selectedUser}
         onClose={()=>setIsEditModalOpen(false)} 
         onUpdate={handleUpdateUser}
         />
      )}
      
    </div>
  );
};

export default UserTable;