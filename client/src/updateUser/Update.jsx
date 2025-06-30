import React from 'react'
import { Link ,useNavigate,useParams} from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const UpdateUser = () => {
    const users = {
        name: "",
        email: "",
        address: "",
    };
    const [user, setUser] = useState(users);
    const navigate = useNavigate();
    const {id} = useParams();

    const inputHandler = (e) => {
        const {name, value} = e.target

        setUser({
            ...user,
            [name]: value
        })
    }

    useEffect(() => {
        axios.get(`http://localhost:8000/api/user/${id}`)
        .then((response)=>{
            setUser(response.data);
        })
        .catch((error) => {
            console.log(error)
        });
    },[id]);

    const submitForm = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8000/api/update/user/${id}`, user)
        // .then((response) => {
        //     toast.success(response.data.message, { position: "top-right" });
        //     navigate("/");
        // })
        .then((response) => {
            toast.success("User updated successfully", { position: "top-right" });
            navigate("/");
        })
        .catch((error) => {
            console.log(error);
        })

    }

  return (
    <div className='addUser'>
        <Link to="/" type='button' className="bg-gray-600 hover:bg-black text-white font-semibold py-2 px-4 rounded mb-2"><i className="fa-solid fa-backward"></i> Back</Link>
        <h3>Update user</h3>
        <br></br>
        <form className='addUserForm' onSubmit={submitForm}>
            <div className='inputGroup'>
                <label htmlFor='name'>Name:</label>
                <input 
                type="text" 
                value={user.name}
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
                value={user.email}
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
                value={user.address}
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

export default UpdateUser;
