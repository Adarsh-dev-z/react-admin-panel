// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { updateUser } from '../../slices/userSlice';
// import { useDispatch, useSelector } from 'react-redux';


// const EditUserModal = ({ user, onClose, onUpdate }) => {
//   const dispatch = useDispatch();
//   const {error} = useSelector((state) => state.user);

//   const {register, watch, formState: { errors }} = useForm();
  
//   const [editedUser, setEditedUser] = useState(user);

//   const handleInputChange = (event) => {
//     const { name, value} = event.target;
//     setEditedUser({ ...editedUser,[name]:value});
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
  
//     console.log('Before dispatching updateUser:', editedUser);
  
//     try {
//       onUpdate(editedUser);
//       await dispatch(updateUser(editedUser));
//       console.log('After dispatching updateUser:', editedUser);
//       onClose();
//     } catch (error) {
//       console.error('Error updating user:', error);
//       // Handle error if needed
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
//       <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
//         <h3 className="text-lg font-bold mb-4">Edit User</h3>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
//               Username
//             </label>
//             <input
//               type="text"
//               name="username"
//              value={editedUser.username}
//              {...register('username', { required: 'username is required', validate: (value)=>value.trim() !=="" || `username cannot be empty` })}
//              onChange={handleInputChange}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
//               Email
//             </label>
//             <input
//               type="email"
//               name="email"
//               value={editedUser.email}
//               {...register('email', { required: 'email is required', validate: (value)=>value.trim() !=="" || `email cannot be empty` })}

//               onChange={handleInputChange}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
//               Phone
//             </label>
//             <input
//               type="text"
//               name="phone"
//               value={editedUser.phone}
//               {...register('phone', { required: 'phone is required', validate: (value)=>value.trim() !=="" || `phone cannot be empty` })}

//               onChange={handleInputChange}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             />
//           </div>
//           <div className="flex items-center justify-between">
//             <button
//               type="submit"
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             >
//               Update
//             </button>
//             <button
//               type="button"
//               onClick={onClose}
//               className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditUserModal;



import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { updateUser } from '../../slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const EditUserModal = ({ user, onClose, onUpdate }) => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.user);

  const { register, watch, formState: { errors } } = useForm();

  const [editedUser, setEditedUser] = useState(user);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log('Before dispatching updateUser:', editedUser);

    try {
      onUpdate(editedUser);
      await dispatch(updateUser(editedUser));
      console.log('After dispatching updateUser:', editedUser);
      onClose();
    } catch (error) {
      console.error('Error updating user:', error);
      // Handle error if needed
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <h3 className="text-lg font-bold mb-4">Edit User</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={editedUser.username}
              {...register('username', { required: 'username is required', validate: (value) => value.trim() !== "" || `username cannot be empty` })}
              onChange={handleInputChange}
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
              value={editedUser.email}
              {...register('email', { required: 'email is required', validate: (value) => value.trim() !== "" || `email cannot be empty` })}
              onChange={handleInputChange}
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
              value={editedUser.phone}
              {...register('phone', { required: 'phone is required', validate: (value) => value.trim() !== "" || `phone cannot be empty` })}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Update
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;