import { useState } from 'react';
import { register } from '../api';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', password: '', email: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register(formData);
      if (response && response.token) {
        localStorage.setItem('token', response.token);
      } else {
        console.error('Token not found in response');
        alert('Invalid credentials');
      }
      alert('Registration successful! You can now login.');
    } catch (error) {
      console.error('Failed to register', error);
      alert('Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register
