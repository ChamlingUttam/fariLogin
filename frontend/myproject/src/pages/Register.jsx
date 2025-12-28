import React, { useState } from "react";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import axios from 'axios'
import { useNavigate } from "react-router-dom";


const Register = ({setUser}) => {

    const [hide,setHide] = useState(false)
    const [error,setError]= useState("")
    const [formData,setFormData] = useState({
      username:"",
      email:"",
      password:"",
    })

    const handleChange = (e)=>{
      setFormData({...formData,[e.target.name]: e.target.value})
    }


     const navigate = useNavigate();
    const handleSubmit = async (e)=>{
      e.preventDefault()

      try {
        const res = await axios.post("/api/users/register",formData)
         localStorage.setItem("token", res.data.token)
         setUser(res.setUser)
         navigate('/login')
        
      } catch (err) {
        setError("registration failed")
      }
    }
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl w-96 p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 mb-4 border rounded-lg outline-blue-500"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-4 border rounded-lg outline-blue-500"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />


<div className="relative w-full">

          <input
            type={hide ? "text" : "password"}
            placeholder="Password"
            className="w-full p-3 mb-6 border rounded-lg outline-blue-500"
            name="password"
            onChange={handleChange}
            value={formData.password}
            />

            <span className="absolute right-4 top-2" onClick={()=>setHide(!hide)}>{hide?<BiShow className="cursor-pointer text-3xl"/>:<BiHide className="cursor-pointer text-3xl" />}</span>
            </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
