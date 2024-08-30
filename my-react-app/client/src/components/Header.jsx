
const Header = () => {

    const searchUserHandler = () => {
        console.log('Search user button clicked');
    }

    const addUserHandler = () => {
        console.log('Add user button clicked');
    }

    const deleteUserHandler = () => {
        console.log('Delete user button clicked');
    }

    return (
        <div className="header-container">
            <div className="header-left">
                <p>User Management</p>
            </div>
            <div className="header-right">
                <button onClick={searchUserHandler}>Search User</button>
                <button onClick={addUserHandler}>Add User</button>
                <button onClick={deleteUserHandler}>Delete User</button>
            </div>

        </div>
    )
}


export default Header