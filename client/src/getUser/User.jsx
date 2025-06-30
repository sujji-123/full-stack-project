import React from 'react'
import { useState,useEffect } from 'react';
import "./user.css"; // Assuming you have a CSS file for styling
import axios from 'axios';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
const User = () => {
   const [users, setUsers] = useState([])
   useEffect(() => {
        const fetchData =async () =>{
            try {
                
                const response = await axios.get("http://localhost:8000/api/users")
                setUsers(response.data)
            } catch (error) {
                console.error("Error while fetching users:", error);
            }
        }
        fetchData();
   }, [])

   const deleteUser = async (userId) => {
    await axios
        .delete(`http://localhost:8000/api/delete/user/${userId}`)
        .then((response) => {
            setUsers((prevUser) =>prevUser.filter((user) => user._id !== userId));
             toast
            .success(response.data.message, { position: "top-right" })
     })
    .catch((error) => {
        console.log(error);
    });
   
   }
  return (
    <div className='userTable'>
        <Link to="/add" className="rounded-full bg-blue-500 text-white px-4 py-2"><i className="fa-solid fa-user-plus"></i>Add User</Link>

        {users.length === 0 ? (
            <div className="text-center">
                <h3 className='text-lg font-semibold'>No Data To Display. </h3>
                <br></br>
                <p>Please add New User.</p>
            </div>
        ):(
        <div className="overflow-x-auto p-4 flex justify-center">
        
            <table className="w-auto border border-gray-300 bg-white shadow-md rounded-lg">
                <thead className="bg-gray-100">
                    <tr>
                    <th className="px-4 py-2 border-b border-r">S.NO</th> 
                    <th className="px-4 py-2 border-b border-r">Name</th>
                    <th className="px-4 py-2 border-b border-r">Email</th>
                    <th className="px-4 py-2 border-b border-r">Address</th>
                    <th className="px-4 py-2 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {users.map((user, index) => {
                        return (
                        <tr className="hover:bg-gray-50">
                        <td className="px-4 py-2 border-b border-r">{index+1}</td>
                        <td className="px-4 py-2 border-b border-r">{user.name}</td>
                        <td className="px-4 py-2 border-b border-r">{user.email}</td>
                        <td className="px-4 py-2 border-b border-r">{user.address}</td>
                        <td className="px-4 py-2 border-b">
                            <Link to={`/update/`+user._id} type='button' className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded mb-2">
                                <i className="fa-solid fa-pen-to-square"></i>
                            </Link>
                            <button type="button" onClick={() => deleteUser(user._id)} className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded ml-2">
                                <i className="fa-solid fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                        )
                    })}
                    
                </tbody>
            </table>
        </div>
        )}

        
    </div>
  )
}

export default User
