import React from 'react'
import './Adduser.css';
import { Link ,useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const AddUser = () => {
    const users = {
        name: "",
        email: "",
        address: "",
    };
    const [user, setUser] = useState(users);
    const navigate = useNavigate();

    const inputHandler = (e) => {
        const {name, value} = e.target

        setUser({
            ...user,
            [name]: value
        })
    }

    const submitForm = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:8000/api/user", user)
        .then((response) => {
            toast.success(response.data.message, { position: "top-right" });
            navigate("/");
        })
        .catch((error) => {
            if (error.response && error.response.data && error.response.data.errorMessage) {
                toast.error(error.response.data.errorMessage, { position: "top-right" });
            } else {
                toast.error("An error occurred", { position: "top-right" });
            }
            // Do NOT navigate on error
        })

    }

  return (
    <div className='addUser'>
        <Toaster position="top-right" />
        <Link to="/" type='button' className="bg-gray-600 hover:bg-black text-white font-semibold py-2 px-4 rounded mb-2"><i className="fa-solid fa-backward"></i> Back</Link>
        <h3>add new user</h3>
        <br></br>
        <form className='addUserForm' onSubmit={submitForm}>
            <div className='inputGroup'>
                <label htmlFor='name'>Name:</label>
                <input 
                type="text" 
                id='name' 
                onChange={inputHandler}
                name='name'
                autoComplete='off'
                placeholder='Enter your name'
            />
            </div>
            <br></br>
            <div className='inputGroup'>
                <label htmlFor='email'>Email:</label>
                <input 
                type="email" 
                id='email' 
                onChange={inputHandler}
                name='email'
                autoComplete='off'
                placeholder='Enter your email'
            />
            </div>
            <br></br>
            <div className='inputGroup'>
                <label htmlFor='address'>Address:</label>
                <input 
                type="text" 
                id='address' 
                onChange={inputHandler}
                name='address'
                autoComplete='off'
                placeholder='Enter your address'
            />
            </div>
            <br></br>
            <div className='inputGroup'><button type='submit' className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded mb-2">Submit</button></div>

        </form>
      
    </div>
  )
}

export default AddUser
