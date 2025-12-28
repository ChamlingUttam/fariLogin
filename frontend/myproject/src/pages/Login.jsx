import React, { useState } from "react";
import { BiShow, BiHide } from "react-icons/bi";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = ({ setUser }) => {
  const [hide, setHide] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/users/login", formData);

      // store token (optional since gpt suggest to learn but fine)
      localStorage.setItem("token", res.data.token);


      setUser(true);
    } catch (err) {
      setError("Login failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl w-96 p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-4 border rounded-lg outline-blue-500"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <div className="relative w-full">
            <input
              type={hide ? "text" : "password"}
              placeholder="Password"
              className="w-full p-3 mb-6 border rounded-lg outline-blue-500"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span
              className="absolute right-4 top-2 cursor-pointer"
              onClick={() => setHide(!hide)}
            >
              {hide ? (
                <BiShow className="text-3xl" />
              ) : (
                <BiHide className="text-3xl" />
              )}
            </span>
          </div>

          {error && (
            <p className="text-red-500 text-center mb-2">{error}</p>
          )}

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg"
          >
            Login
          </button>


          <p className="text-center mt-4 text-sm">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="text-blue-500 font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
