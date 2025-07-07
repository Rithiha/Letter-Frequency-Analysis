import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./auth.css";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const REACT_APP_API_BASE_URL =
    process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";
  const validatePassword = (pwd) => {
    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(pwd);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    if (value && !validatePassword(value)) {
      setPasswordError(
        "Password must be at least 8 characters, include a number and a special character."
      );
    } else {
      setPasswordError("");
    }
  };

  const handleRegister = async () => {
    if (!username || !password) {
      toast.error("Username and Password are required");
      return;
    }

    if (!validatePassword(password)) {
      setPasswordError(
        "Password must be at least 8 characters, include a number and a special character."
      );
      return;
    }

    try {
      await axios.post(`${REACT_APP_API_BASE_URL}/api/auth/register`, {
        username,
        password,
      });

      toast.success("Registration successful! Redirecting to login...");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-shape"></div>
      <div className="login-shape login-shape2"></div>

      <div className="login-form">
        <h2>Register Here</h2>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />

        {password && passwordError && (
          <small className="password-hint">{passwordError}</small>
        )}

        <button onClick={handleRegister}>Register</button>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default Register;
