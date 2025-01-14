import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Users } from "../mockData/user";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({}); // Initialize errors as an empty object
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error on input change
  };

  const handleLogin = () => {
    const newErrors = {};
    if (credentials.username !== Users.username)
      newErrors.username = "Invalid username";
    if (credentials.password !== Users.password)
      newErrors.password = "Invalid password";
    setErrors(newErrors);
    if (!Object.keys(newErrors).length) navigate("/dashboard/overview");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="bg-white shadow-md rounded px-8 py-6 w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        {["username", "password"].map((field) => (
          <div key={field} className="mb-4">
            <input
              type={field === "password" ? "password" : "text"}
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={credentials[field]}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded focus:outline-none ${
                errors[field] ? "border-red-500" : "border-gray-300"
              } focus:ring focus:ring-blue-500`}
            />
            {errors[field] && (
              <p className="text-sm text-red-500 mt-1">{errors[field]}</p>
            )}
          </div>
        ))}
        <div className="mb-4 text-right">
          <Link
            to="/forgot-password"
            className="text-sm text-blue-500 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
