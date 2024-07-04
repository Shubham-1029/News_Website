import { useState } from 'react';
import { Navigate } from 'react-router-dom'; // Import Navigate from react-router-dom
import { login } from '../api';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [loggedIn, setLoggedIn] = useState(false); // State to track login status

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData);
      console.log(response); // Log the entire response object
      if (response && response.token) {
        localStorage.setItem('token', response.token);
        setLoggedIn(true); // Update login state to true on successful login
      } else {
        console.error('Token not found in response');
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Failed to login', error);
      alert('Invalid credentials');
    }
  };

  // Redirect to home page if logged in
  if (loggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
