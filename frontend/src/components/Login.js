import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./auth.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const REACT_APP_API_BASE_URL =
    process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";
  const validate = () => {
    const newErrors = {};
    if (!username.trim()) newErrors.username = "Username is required";
    if (!password.trim()) newErrors.password = "Password is required";
    return newErrors;
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, []);

  const handleLogin = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const res = await axios.post(`${REACT_APP_API_BASE_URL}/api/auth/login`, {
        username,
        password,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", username);
      navigate("/dashboard");
    } catch (err) {
      setErrors({ api: err.response?.data?.message || "Login failed" });
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-shape"></div>
      <div className="login-shape login-shape2"></div>

      <div className="login-form">
        <h2>Login Here</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setErrors((prev) => ({ ...prev, username: "", api: "" }));
          }}
        />
        {errors.username && (
          <div className="input-error">{errors.username}</div>
        )}

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrors((prev) => ({ ...prev, password: "", api: "" }));
          }}
        />
        {errors.password && (
          <div className="input-error">{errors.password}</div>
        )}

        {errors.api && <div className="input-error">{errors.api}</div>}

        <button onClick={handleLogin}>Log In</button>

        <p className="auth-switch">
          Don’t have an account?{" "}
          <button className="auth-link" onClick={() => navigate("/register")}>
            Register
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
