import { useState } from "react";
import AdminHeader from "./AdminHeader"
import UserTable from "./UserTable"
import axios from "axios";


const AdminBody = () => {

    const [newUser, setNewUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
console.log('new user:', newUser, 'search term:', searchTerm);
    // const handleAddUser = async (userData) => {
    //     try {
    //         const response = await axios.post('http://localhost:3000/api/admin/add-user', userData, { withCredentials: true });
    //         console.log('User added successfully:', response);
    //         setNewUser(response.data.newUser);
    //     } catch (err) {
    //         console.log('error adding user:', err);
    //     }
    // }

    const handleSearch = (term)=>{
        setSearchTerm(term);
    }
        

    return (
        
    <>
        <AdminHeader onSearch={handleSearch} />
        <UserTable newUser={newUser} searchTerm={searchTerm} />
    </>

    )

};

export default AdminBody;