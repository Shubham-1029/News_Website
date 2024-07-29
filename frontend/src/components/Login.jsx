import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api";
import "../components/css/Login.css";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData);
      if (response && response.token) {
        localStorage.setItem("token", response.token);
        setLoggedIn(true);
        navigate("/");
      } else {
        console.error("Token not found in response");
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Failed to login", error);
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3 mt-5 mx-3">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="form-group mb-3 mt-5 mx-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-secondary my-5 text-center">
          Login
        </button>
        <div className="sign-up-redirect">
          <Link className="Sign-up" to={"/register/"}>
            {" "}
            Need an account? Sign Up{" "}
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
